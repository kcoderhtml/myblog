# The [Blog](https://kieranklukas.com) of Kieran Klukas

[![Netlify Status](https://api.netlify.com/api/v1/badges/a6f714aa-10c4-443a-8b98-c9d687227961/deploy-status)](https://app.netlify.com/sites/funny-empanada-9407a1/deploys)

## 🚀 Project Structure

Inside of the project, you'll see the following folders and files:

```
├── public/
├── src/
│   ├── components/
│   ├── layouts/
|   ├── pages/
|   ├── styles/
│   └── utils/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where I like to put any Astro/React/Vue/Svelte/Preact components.

The content of the blog posts is fetched from [Vrite](https://vrite.io/), where it is written and stored, and used to build the flat files that are deployed to netlify.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `ntl dev`                 | Starts local dev server at `localhost:8888`      |
| `ntl build`               | Build your production site to `./dist/`          |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Astro's documentation](https://docs.astro.build) or jump into their [Discord server](https://astro.build/chat).

## Credit

This theme is heavily based off of the [Astro Blog Template](https://github.com/Charca/astro-blog-template) by [Maxi Ferreira (@charca)](https://twitter.com/charca).

## License
This repositories code is licensed with the GNU AFFERO GENERAL PUBLIC LICENSE you can view it (here)[LICENSE.md]
