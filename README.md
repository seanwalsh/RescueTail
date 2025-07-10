# 🖤 SanityPress

> _Ready, Set, Impress._

An opinionated, fully customizable Next.js (App Router) and Sanity starter template with Tailwind CSS and pre-built schema for rapid website development.

[Demo](https://sanitypress.dev) | [Docs](https://sanitypress.dev/docs) | [Blog](https://sanitypress.dev/blog) | [Modules](https://sanitypress.dev/docs/modules) | [Studio screenshots](https://sanitypress.dev/studio-screenshots) | [Sanity.io](https://www.sanity.io/templates/sanitypress)

```sh
npm create sanity@latest -- --template nuotsu/sanitypress
```

![](https://cdn.sanity.io/images/elyfelq1/production/17ec6fdce5bde2beebfb8c9b15078922e5fac6f3-3616x1808.png?w=2000)

## Key Features

- [x] ✨ Next.js 15 (App Router, RSC, Typescript) with Tailwind CSS
- [x] 📕 [Pre-configured Sanity schema](/src/sanity/schemaTypes/index.ts) & [frontend components](/src/ui/)
- [x] ✏️ [Visual editing](https://sanitypress.dev/blog/visual-editing) in [an embedded Sanity Studio](https://sanitypress.dev/blog/why-you-should-embed-your-studio)
- [x] ⌨️ Auto-generated [sitemap](https://sanitypress.dev/sitemap.xml) + [Blog RSS feed](https://sanitypress.dev/blog/rss.xml)
- [x] ⚡ [Perfect Lighthouse scores](https://sanitypress.dev/blog/how-fast-is-sanitypress) on desktop and 99/100 on mobile.

## Getting Started

Full instructions on the [docs](https://sanitypress.dev/docs).

### 1. Install with the Sanity CLI

Run the following command to initialize this template on your local computer.

```sh
npm create sanity@latest -- --template nuotsu/sanitypress
```

See the documentation if you are [having issues with the CLI](https://www.sanity.io/help/cli-errors).

Alternatively, you can also clone or fork [the GitHub template](https://github.com/nuotsu/sanitypress) to set up manually.

### 2. Start local server

Run the following command to start the development server:

- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/admin

```sh
npm run dev
```

### 3. Add content

In your new Sanity Studio, publish the **required** `site` and `page` documents.

| Document        | Slug           | Use             | Required? | Notes                                                                                          |
| --------------- | -------------- | --------------- | :-------: | ---------------------------------------------------------------------------------------------- |
| `site`          |                | Global settings |    ✅     |                                                                                                |
| `page`          | `index`        | Homepage        |    ✅     |                                                                                                |
| `page`          | `404`          | Page not found  |           |                                                                                                |
| `page`          | `blog`         | Blog listing    |           | Add the [**Blog frontpage**](https://sanitypress.dev/docs/modules/blog-frontpage) module       |
| `global-module` | `blog/` (path) | Blog post       |           | Add the [**Blog post content**](https://sanitypress.dev/docs/modules/blog-post-content) module |

Read the [Getting Started docs](https://sanitypress.dev/docs/getting-started) for more information.

Alternatively, you can import the [demo site](https://demo.sanitypress.dev) dataset:

```sh
sanity dataset import src/sanity/demo.tar.gz
```

### 4. Set up deployments

#### 1. Create a GitHub repository

Create a GitHub repository from this project. [Learn more](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).

#### 2. Set up deployments

Set up your deployment settings, such as the **Root Directory** to your Next.js app.

#### 3. Set environment variables

Configure your Environment Variables

```ini
NEXT_PUBLIC_BASE_URL="" # https://sanitypress.dev

NEXT_PUBLIC_SANITY_PROJECT_ID="" # abcdefgh
NEXT_PUBLIC_SANITY_DATASET="" # production
SANITY_API_READ_TOKEN="" # "Viewer" token from https://sanity.io/manage

NEXT_PUBLIC_GITHUB_TOKEN="" # recommended to add to display GitHub stars & forks
```

### 5. Customize

Adjust frontend styles, edit/add Sanity schema and modules, and [more](https://sanitypress.dev/blog/the-developers-guide-to-customizing-sanitypress).

## How to Support

- [🧡 Donations](https://sanitypress.dev/how-to-support)
- [🩷 Sponsor on GitHub](https://github.com/sponsors/nuotsu)
- [☕ Buy me a coffee](https://buymeacoffee.com/nuotsu)
