import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const METADATA_VIRTUAL_ID = 'virtual:blog-posts-metadata'
const RESOLVED_ID = '\0' + METADATA_VIRTUAL_ID

function parseFrontmatter(raw) {
  const match = raw.match(/---\s*([\s\S]*?)\s*---/)
  if (!match) return {}
  const block = match[1].trim()
  const metadata = {}
  block.split('\n').forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    const value = valueArr.join(': ').trim().replace(/^['"](.*)['"]$/, '$1')
    metadata[key.trim()] = value
  })
  return metadata
}

function getContentDir(config) {
  const root = config.root || process.cwd()
  return path.join(root, 'src', 'content')
}

function findMdxFiles(dir, base = '') {
  const entries = fs.readdirSync(path.join(dir, base), { withFileTypes: true })
  const result = []
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name
    const full = path.join(dir, rel)
    if (e.isDirectory()) {
      result.push(...findMdxFiles(dir, rel))
    } else if (e.isFile() && /\.(en|ko)\.mdx$/.test(e.name)) {
      result.push(rel)
    }
  }
  return result
}

export default function blogMetadataPlugin() {
  let root = process.cwd()
  return {
    name: 'blog-posts-metadata',
    configResolved(config) {
      root = config.root || process.cwd()
    },
    resolveId(id) {
      if (id === METADATA_VIRTUAL_ID) return RESOLVED_ID
      return null
    },
    load(id) {
      if (id !== RESOLVED_ID) return null
      const contentDir = getContentDir({ root })
      if (!fs.existsSync(contentDir)) {
        return `export const postsMetadata = []; export default postsMetadata;`
      }
      const files = findMdxFiles(contentDir)
      const list = []
      for (const rel of files) {
        const m = rel.match(/([^/]+)\/([^/]+)\.(en|ko)\.mdx$/)
        if (!m) continue
        const slug = m[1]
        const lang = m[3]
        const raw = fs.readFileSync(path.join(contentDir, rel), 'utf-8')
        const meta = parseFrontmatter(raw)
        list.push({
          slug,
          lang,
          title: meta.title || slug,
          date: meta.date || '',
        })
      }
      list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
      return `export const postsMetadata = ${JSON.stringify(list)};\nexport default postsMetadata;`
    },
  }
}
