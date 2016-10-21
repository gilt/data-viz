import eslint from 'gulp-eslint';
import gulp from 'gulp';

gulp.task('lint', () => {
  const glob = [
    '**/*.js',
    '**/*.vue',
    '!dist/**/*',
    '!node_modules'
  ];

  return gulp.src(glob)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint']);
