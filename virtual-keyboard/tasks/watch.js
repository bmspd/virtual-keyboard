const {
  watch,
  parallel,
} = require('gulp');

module.exports = function watching() {
  watch(['src/**/*.html', 'src/*.html'], parallel('html'));
  watch('src/**/*.scss', parallel('style'));
  watch('src/**/*.js', parallel('dev_js'));
};
