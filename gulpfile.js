const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const pump = require("pump");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("sass"));

gulp.task("minify-html", function () {
  return gulp
    .src("app/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("babel-js", function () {
  return gulp
    .src("app/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("minify-js", function () {
  return gulp.src("app/js/**/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
});

gulp.task("copyFile", () => {
  // 'copyFile' 是任務名稱，可自行定義
  return gulp.src("./index.html").pipe(gulp.dest("./dist"));
});

gulp.task("compress", function (cb) {
  pump([gulp.src("app/script/*.js"), uglify(), gulp.dest("dist/script")], cb);
});

gulp.task("minify", function () {
  return gulp
    .src("app/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

function compileSass() {
  return gulp
    .src("app/scss/**/*.scss") // Source folder
    .pipe(sass().on("error", sass.logError)) // Compile SCSS to CSS
    .pipe(gulp.dest("./dist/css")); // Output folder
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp.watch("app/scss/**/*.scss", compileSass);
  gulp
    .watch("app/*.html", gulp.series("minify-html"))
    .on("change", browserSync.reload);

  // gulp
  //   .watch("app/js/**/*.js", gulp.series("minify-js"))
  //   .on("change", browserSync.reload);
  gulp
    .watch("app/js/**/*.js", gulp.series("babel-js"))
    .on("change", browserSync.reload);
}

gulp.task("default", gulp.series("minify-html", compileSass, serve));
