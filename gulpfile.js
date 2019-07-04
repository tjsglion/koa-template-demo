const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const {resolve} = require('path');
const replace = require('rollup-plugin-replace');

// 入口文件
const entries = resolve(__dirname, './', 'src/**/*.js');
const clearies = resolve(__dirname, './', 'src/services/config/index.js');
// 清洗文件
// 开发环境
function devConfig () {
  return watch(entries, {ignoreInitial: false}, function () {
    gulp.src(entries)
      .pipe(babel({
        babelrc: false,
        plugins: ['@babel/plugin-transform-modules-commonjs']
      }))
      .pipe(gulp.dest('./dist'));
  });
}
// 生产环境
function prodConfig () {
  return gulp.src(entries)
    .pipe(babel({
      babelrc: false,
      ignore: [clearies],
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }))
    .pipe(gulp.dest('./dist'));
}
// 清洗
function clearConfig () {
  return gulp.src(entries)
    .pipe(rollup({
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ],
      input: [clearies],
      output: {
        format: 'cjs'
      }
    }))
    .pipe(gulp.dest('./dist'));
}

let target = gulp.series(devConfig);
if ('production' === process.env.NODE_ENV) {
  target = gulp.series(prodConfig, clearConfig);
}

gulp.task('default', target);
