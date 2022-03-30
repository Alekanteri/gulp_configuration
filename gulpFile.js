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
//! ------------ //

global.app = {
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
const mainTasks = gulp.parallel(copy, html, scss, js, images);
const serverTask = gulp.parallel(watcher, server);

const dev = gulp.series(clear, mainTasks, serverTask);

gulp.task("default", dev);
