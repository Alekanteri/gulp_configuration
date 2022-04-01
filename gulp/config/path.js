import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    files: `${buildFolder}/assets/files/`,
    fonts: `${buildFolder}/assets/fonts/`,
    images: `${buildFolder}/assets/img/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
  },
  src: {
    files: `${srcFolder}/assets/files/**/*.*`,
    images: `${srcFolder}/assets/img/**/*.{jpg, jpeg, png, webp, gifm ico}`,
    svg: `${srcFolder}/assets/img/**/*.svg`,
    html: `${srcFolder}/html/*.html`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/app.js`,
  },
  watch: {
    files: `${srcFolder}/assets/files/**/*.*`,
    images: `${srcFolder}/assets/img/**/*.*`,
    html: `${srcFolder}/html/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
};
