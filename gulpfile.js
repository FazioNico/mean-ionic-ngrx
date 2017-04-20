/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-04-2017
 */

 var gulp = require('gulp');
 var ghPages = require('gulp-gh-pages');

 var path = './platforms/browser/www';

 gulp.task('deploy', function() {
   return gulp.src(path+'/**/*')
     .pipe(ghPages());
 });
