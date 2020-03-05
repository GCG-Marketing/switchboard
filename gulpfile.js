const gulp = require("gulp");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;

gulp.task("dist", function() {
  return pipeline(gulp.src("src/switchboard.js"), uglify(), gulp.dest("dist"));
});

gulp.task("default", gulp.parallel("dist"));
