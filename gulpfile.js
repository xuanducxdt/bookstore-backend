const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');

gulp.task('mocha', () => gulp.src(['tests/*.spec.ts'], { read: false })
  .pipe(mocha({
    reporter: 'spec',
    require: ['ts-node/register'],
    timeout: 10000,
  }))
  .on('error', gutil.log));

gulp.task('watch-mocha', () => {
  gulp.watch('tests/**/*.spec.ts', gulp.series('mocha'));
});

gulp.task('default', gulp.parallel(['mocha', 'watch-mocha']));
