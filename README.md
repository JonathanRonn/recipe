# Recipe Scraper App

A web application for scraping and saving recipes from various websites.

## Features

- Enter a URL to scrape recipe ingredients and instructions
- Save recipes to your personal collection
- View and manage your saved recipes
- Responsive design for desktop and mobile

## Tech Stack

- [Astro](https://astro.build/) - Fast, lightweight web framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - UI component library for Tailwind
- [Cheerio](https://cheerio.js.org/) - Fast and flexible implementation of jQuery for server-side scraping
- Vanilla JavaScript for client-side functionality

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:4321`

## Usage

1. Enter a recipe URL in the form on the homepage
2. Click "Scrape Recipe" to extract the recipe information
3. Review the extracted data and click "Save to My Recipes" to add it to your collection
4. View your saved recipes by clicking "My Recipes" in the navigation bar

## Notes on Recipe Scraping

The recipe scraper attempts to detect and extract recipe information from a variety of websites. However, the structure of recipe websites can vary greatly, so extraction results may not be perfect for all websites.

The scraper looks for common patterns and selectors used on recipe websites, such as:

- Recipe titles in heading elements
- Ingredients in list items with specific class names
- Instructions in ordered or unordered lists

For better results, try using URLs from popular recipe websites.

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
