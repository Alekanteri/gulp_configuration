import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

//! Import Tasks: //
import { copy } from "./gulp/tasks/copy.js";
import { clear } from "./gulp/tasks/clear.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfTottf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svg } from "./gulp/tasks/svg.js";
import { zip } from "./gulp/tasks/zip.js";
//! ------------ //

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

const watcher = () => {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
};

//* Compact task-manager //
const fonts = gulp.series(otfTottf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);
const serverTask = gulp.parallel(watcher, server);

//* Modes //
const dev = gulp.series(clear, mainTasks, serverTask);
const build = gulp.series(clear, mainTasks);
const zipArchive = gulp.series(clear, mainTasks, zip);

//! Exports for scripts //
export { svg };
export { dev };
export { build };
export { zipArchive };

gulp.task("default", dev);
