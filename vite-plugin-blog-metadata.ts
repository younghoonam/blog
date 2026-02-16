/**
 * Vite plugin to generate blog posts metadata from MDX frontmatter.
 */
import path from 'path'
import fs from 'fs'
import type { Plugin, ResolvedConfig } from 'vite'
import type { PostMetadata, Lang, PostSlug } from './src/types/index.js'

const METADATA_VIRTUAL_ID = 'virtual:blog-posts-metadata'
const RESOLVED_ID = '\0' + METADATA_VIRTUAL_ID

interface Frontmatter {
  title?: string
  date?: string
  slug?: string
  [key: string]: string | undefined
}

function parseFrontmatter(raw: string): Frontmatter {
  const match = raw.match(/---\s*([\s\S]*?)\s*---/)
  if (!match) return {}
  const block = match[1].trim()
  const metadata: Frontmatter = {}
  block.split('\n').forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    const value = valueArr.join(': ').trim().replace(/^['"](.*)['"]$/, '$1')
    metadata[key.trim()] = value
  })
  return metadata
}

interface Config {
  root?: string
}

function getContentDir(config: Config): string {
  const root = config.root || process.cwd()
  return path.join(root, 'src', 'content')
}

function findMdxFiles(dir: string, base = ''): string[] {
  const entries = fs.readdirSync(path.join(dir, base), { withFileTypes: true })
  const result: string[] = []
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name
    if (e.isDirectory()) {
      result.push(...findMdxFiles(dir, rel))
    } else if (e.isFile() && /\.(en|ko)\.mdx$/.test(e.name)) {
      result.push(rel)
    }
  }
  return result
}

export default function blogMetadataPlugin(): Plugin {
  let root = process.cwd()
  return {
    name: 'blog-posts-metadata',
    configResolved(config: ResolvedConfig) {
      root = config.root || process.cwd()
    },
    resolveId(id: string): string | null {
      if (id === METADATA_VIRTUAL_ID) return RESOLVED_ID
      return null
    },
    load(id: string): string | null {
      if (id !== RESOLVED_ID) return null
      const contentDir = getContentDir({ root })
      if (!fs.existsSync(contentDir)) {
        return `export const postsMetadata: PostMetadata[] = []; export default postsMetadata;`
      }
      const files = findMdxFiles(contentDir)
      const list: PostMetadata[] = []
      for (const rel of files) {
        const m = rel.match(/([^/]+)\/([^/]+)\.(en|ko)\.mdx$/)
        if (!m) continue
        const slug = m[1] as PostSlug
        const lang = m[3] as Lang
        if (lang !== 'en' && lang !== 'ko') continue
        const raw = fs.readFileSync(path.join(contentDir, rel), 'utf-8')
        const meta = parseFrontmatter(raw)
        list.push({
          slug,
          lang,
          title: meta.title || slug,
          date: meta.date || '',
        })
      }
      list.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
      return `export const postsMetadata = ${JSON.stringify(list)};\nexport default postsMetadata;`
    },
  }
}
