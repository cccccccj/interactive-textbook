var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
//var sass = require('gulp-sass');
//var autoprefixer = require('gulp-autoprefixer');


gulp.task('transpile-js', function() {
    return gulp.src('dev-js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            babelrc: false,
            presets: ["es2015"],
            comments: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js/'));
});

// Build tasks
gulp.task('build', gulp.parallel('transpile-js'));


gulp.task('serve', function(c) {
    browserSync({
        port: 5000,
        logPrefix: 'eTextbook',
        
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        },
        
        browser: ['google chrome', 'firefox', 'safari'],
        
        server: {
            baseDir: './',
            index: 'index.html'
        }
    }, c);
});


gulp.task('reload-browser', function(done) {
    browserSync.reload();
    done();
});

gulp.task('watch-js', function() {
    return gulp.watch(['dev-js/**/*.js'], gulp.series('transpile-js',  'reload-browser'));
});

gulp.task('watch-styles', function() {
    return gulp.watch(['styles/**/*'], gulp.series('reload-browser'));
});

gulp.task('watch-html', function() {
    return gulp.watch(['index.html', 'indkml-nodes/**/*.html'], gulp.series('reload-browser'));
});

// Watch tasks
gulp.task('watch', gulp.parallel('watch-js', 'watch-styles', 'watch-html'));


gulp.task('default', gulp.series('build', 'serve', 'watch'));


//gulp.task('sass', function(){
//	return gulp.src('./src/scss/*.scss')
//	.pipe(sass().on('error', sass.logError))
//	.pipe(autoprefixer())
//	.pipe(gulp.dest('./assets/css'));
//});