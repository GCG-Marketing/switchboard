const gulp = require("gulp");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;
const rename = require("gulp-rename");

gulp.task("dist", function() {
  return pipeline(
    gulp.src("src/switchboard.js"),
    uglify(),
    rename("switchboard.min.js"),
    gulp.dest("dist")
  );
});

gulp.task("default", gulp.parallel("dist"));
