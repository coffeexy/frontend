'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const mcss = require('gulp_mcss');
const sprity = require('sprity');

gulp.task('watch', function() {
  gulp.watch(['src/html/**/**/*.js', 'src/html/**/**/*.html', 'src/javascript/**/**/*.js', 'src/javascript/**/**/*.html'], {cwd: '../../webapp'}, reload);
});

//https://github.com/leeluolee/mcss
gulp.task('mcss', (done) => {
    let stream = gulp.src(['./src/mcss/*.mcss', '!./src/mcss/_*.mcss'])
        .pipe(mcss({
            format: 3,
            importCSS: true,
            pathes: ['./src/javascript/lib', './node_modules'],
        }))
        .pipe(gulp.dest('./src/css'));

    return stream;
});

gulp.task('mcss-watch', ['mcss'], (done) => gulp.watch(['./src/mcss/**/*.mcss'], ['mcss']));

//https://github.com/sprity/sprity
gulp.task('sprites', function () {
  return sprity.src({
    src: './res/images/sprites/**/*.{png,jpg}',
    cssPath: './res/images/',
    style: './sprite.css'
  })
  .pipe(gulpif('*.png', gulp.dest('./res/images/'), gulp.dest('./src/css/')))
});


//https://github.com/backflip/gulp-iconfont-css
//https://www.npmjs.com/package/gulp-iconfont

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);
var fontName = 'icons';

gulp.task('iconfont', function(){
  gulp.src(['./res/fonts/svg/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      targetPath: './../../src/css/icons.css',
      fontPath: './res/fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      prependUnicode: true, // recommended option 
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], 
      timestamp: runTimestamp
     }))
    .pipe(gulp.dest('./res/fonts/'));
});

gulp.task('icon', ['sprites', 'iconfont']);

//gulp.task('default', ['mcss-watch', 'watch']);

gulp.task('default', ['mcss-watch']);
