var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	reload = browserSync.reload;


gulp.task('browser-sync', function(){
		browserSync({
			server: {
				baseDir: "./"
      },

      snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        },

		});
});

gulp.task('sass', function(){
	return gulp.src('./src/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', ['sass', 'browser-sync'], function () {
		gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch("./assets/css/*.css").on('change', reload);
		gulp.watch("./**/*.html").on('change', reload);
});


gulp.task('default', ['watch']);
