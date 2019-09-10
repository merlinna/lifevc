const gulp=require('gulp');
const html=require('gulp-minify-html');
const css=require('gulp-minify-css');
const js=require('gulp-uglify');
const watch=require('gulp-watch');
const sass = require('gulp-sass');
const babel = require('gulp-babel'); //es6转es5主要模块
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块
const imagemin=require('gulp-imagemin');
const souremap=require('gulp-sourcemaps');
//html压缩
gulp.task('htmlfile',function(){ //执行任务。第一个参数是任务名称。在cmd里执行用gulp htmlfile
    return gulp.src('src/*.html') //引入文件
    .pipe(html())//执行html压缩
    .pipe(gulp.dest('dist/'))//输出,没有自动创建
})
//css压缩
gulp.task('cssfile',function(){ 
    return gulp.src('src/css/*.css')
    .pipe(css())
    .pipe(gulp.dest('dist/css'))
})
//js压缩
// gulp.task('jsfile',function(){ 
//     return gulp.src('js/*.js')
//     .pipe(js())
//     .pipe(gulp.dest('dist/js'))
// })

//sass编译成css
gulp.task('runsass', function () {
        return gulp.src('src/scss/*.scss')
            .pipe(souremap.init()) //初始化
            .pipe(sass({
                outputStyle: 'compressed'
            })) //执行编译,compressed:压缩一行
            .pipe(souremap.write('./maps'))//生成map文件
            .pipe(gulp.dest('dist/css/'));
    });

//js转码，压缩的合并实现
gulp.task('babel', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(js())
        .pipe(gulp.dest('dist/js/'));
});
//6.png图片的压缩
//图片压缩的插件：gulp-imagemin
gulp.task('runimg', function () {
    return gulp.src('src/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});
//.监听
gulp.task('default',function(){
	watch(['src/*.html','src/css/*.css','src/scss/*.scss','src/js/*.js'],gulp.parallel('htmlfile','cssfile','runsass','babel'));  
	//watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
	//gulp.parallel() –并行运行任务 
});