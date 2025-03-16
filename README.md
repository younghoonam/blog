# Blog

Blog with .mdx and bilingual support. Current language setup is /en and /ko. Create new posts by creating a directory with mdx files inside contents. directory, mdx name and slug is recommended to be the same. automatically fetches and imports components used by mdx. components must be in the same directory as mdx file.

## Features

- 📄 MDX-based blog posts
- 🌍 Multilingual support (English & Korean)
- 🎨 Customizable themes (light/dark mode)
- 🚀 Optimized for performance & SEO

## Adding New Posts

1. Create a new folder inside `/content/`.
2. Add `index.en.mdx` and/or `index.kr.mdx` for different languages.
3. Include metadata in the frontmatter:

   ```
   ---
   title: "New Post"
   date: "2025-03-13"
   slug: "new-post"
   ---

   import { TestComponent } from "./TestComponent";

   ## Step 1: Prepare Materials

   Prepare materials to desired form

   <TestComponent />
   ...
   ```
