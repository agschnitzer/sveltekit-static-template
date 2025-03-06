## SvelteKit Static Template

A minimal template for building static sites using [SvelteKit](https://kit.svelte.dev/docs/introduction)
and [TailwindCSS](https://tailwindcss.com/docs). This template uses the `adapter-static` package to generate static files in the
`build` directory.

### Overview

- [Quick Start](#quick-start)
- [Features](#features)
- [Components](#components)
- [Static Files](#static-files)
- [License](#license)

### Quick Start

Click the "Use this template" button at the top of the repository to create your own project. For more details, check
[GitHub's guide on template repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

Install the dependencies with `npm i` (or `pnpm i` or `yarn`), then start the development server with `npm run dev` or build the project for
production with `npm run build`.

> [!NOTE]\
> Both the development server and the build process require a `.env` file in the root of the project. Make sure to create this file and
> define any necessary environment variables before running the project.

### Features

- **CMS Integration**: Integrates with [Contentful](https://www.contentful.com/) to fetch data at build time.
- **Asset Optimization**: Utilizes the vite-imagetools package to optimize images, automatically generating multiple sizes based on
  Contentful asset descriptions.
- **SEO & Metadata**: Retrieves metadata such as page titles, descriptions, and Open Graph tags from Contentful to enhance SEO.
- **Accessibility**: Improves accessibility and SEO by including Published and Updated dates on each page. Also features a Skip to content
  link for better keyboard navigation.

### Components

- **Image**: A responsive image component that uses the `srcset` attribute to load the most suitable image size lazily.
- **Link**: A flexible link component that renders either an `<a>` or `<button>` element based on whether the `href` prop is provided.

### Static Files

The static directory contains essential files such as `robots.txt`, favicon images, and fonts.

## License

This project is open source and available under the [MIT License](LICENSE).
