import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

// dynamic basePath set via env var SVELTE_APP_BASEPATH
const basePath = "/" + process.env.SVELTE_APP_BASEPATH.replaceAll("/", "")

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    files: {
      lib: "src/lib"
    },
    paths: {
      base: basePath
    }
  }
};

export default config;
