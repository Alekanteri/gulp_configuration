import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfTottf = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/assets/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/assets/fonts/`));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/assets/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWidth = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;

            if (fontWidth.toLowerCase() === "thin") {
              fontWidth = 100;
            } else if (fontWidth.toLowerCase() === "extralight") {
              fontWidth = 200;
            } else if (fontWidth.toLowerCase() === "light") {
              fontWidth = 300;
            } else if (fontWidth.toLowerCase() === "medium") {
              fontWidth = 500;
            } else if (fontWidth.toLowerCase() === "semibold") {
              fontWidth = 600;
            } else if (fontWidth.toLowerCase() === "bold") {
              fontWidth = 700;
            } else if (
              fontWidth.toLowerCase() === "extrabold" ||
              fontWidth.toLowerCase() === "heavy"
            ) {
              fontWidth = 800;
            } else if (fontWidth.toLowerCase() === "black") {
              fontWidth = 900;
            } else {
              fontWidth = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face {
                font-family: ${fontName};
                font-display: swap;
                src: url("../assets/fonts/${fontFileName}.woff2") format("woff2"), url("../assets/fonts/${fontFileName}");
                font-weight: ${fontWidth};
                font-style: normal;
              }\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log("fonts.scss already exist");
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
