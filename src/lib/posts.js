/**
 * Post list and loader using Vite's import.meta.glob.
 */
const mdxGlob = import.meta.glob('../content/**/*.mdx')

const KNOWN_SLUGS = ['bucket-hat', 'marblie']

function parsePathToSlugLang(path) {
  const normalized = String(path).replace(/\\/g, '/').replace(/\?.*$/, '').trim()
  const m = normalized.match(/([^/]+)\/([^/]+)\.(en|ko)\.mdx$/i)
  return m ? { slug: m[1], lang: m[3] } : null
}

const postLoaderMap = new Map()
for (const [path, loader] of Object.entries(mdxGlob)) {
  const parsed = parsePathToSlugLang(path)
  if (parsed) postLoaderMap.set(`${parsed.slug}.${parsed.lang}`, loader)
}

export function getPostList() {
  return Array.from(postLoaderMap.entries()).map(([key, loader]) => {
    const [slug, lang] = key.split('.')
    return { slug, lang, path: key }
  })
}

/**
 * Frontmatter from Vite plugin (virtual:blog-posts-metadata).
 */
import postsMetadataImport from 'virtual:blog-posts-metadata'
const postsMetadata = Array.isArray(postsMetadataImport) ? postsMetadataImport : []

/**
 * @returns {{ slug: string, lang: string, title: string, date: string }[]}
 */
function getPostsWithMetadataSync() {
  if (Array.isArray(postsMetadata) && postsMetadata.length > 0) {
    return [...postsMetadata].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  }
  const result = []
  for (const [key] of postLoaderMap) {
    const [slug, lang] = key.split('.')
    result.push({ slug, lang, title: slug, date: '' })
  }
  if (result.length === 0) {
    for (const slug of KNOWN_SLUGS) {
      result.push({ slug, lang: 'en', title: slug, date: '' })
      result.push({ slug, lang: 'ko', title: slug, date: '' })
    }
  }
  return result.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
}

export function getPostsWithMetadata() {
  return Promise.resolve(getPostsWithMetadataSync())
}

export { getPostsWithMetadataSync }

/**
 * Load MDX component for a given slug and lang.
 * @param {string} slug
 * @param {string} lang
 * @returns {Promise<{ default: React.ComponentType, frontmatter?: object }>}
 */
export function getPostModule(slug, lang) {
  const loader = postLoaderMap.get(`${slug}.${lang}`)
  if (!loader) return Promise.reject(new Error(`Post not found: ${slug} (${lang})`))
  return loader()
}

export { mdxGlob }
