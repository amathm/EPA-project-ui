
const gulp = require('gulp');
const nodemon = require('nodemon');

gulp.task('server', function() {
  nodemon({
      script: '../api/server.js',
      watch: ["../api/server.js", "../api/app.js", "../api/resources/routes/", 'public/*', 'public/*/**'],
      ext: 'js'
  }).on('restart', () => {
  gulp.src('server.js')
    .pipe(notify('Running the start tasks and stuff'));
  });
});

gulp.task('run', gulp.series(['server'], () => {
  browser.init({server: '../api/', port: port});
}));
