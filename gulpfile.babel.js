import eslint from 'gulp-eslint';
import gulp from 'gulp';

gulp.task('lint', () => {
  let glob = [
    'index.js',
    'app.js',
    'routes.js',
    'gulpfile.babel.js'
  ];

  return gulp.src(glob)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint']);
