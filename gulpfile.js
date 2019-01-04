var gulp       = require('gulp'),
	browserSync  = require('browser-sync');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('src/**/*.html', browserSync.reload);
	gulp.watch('src/**/*.js', browserSync.reload);
	gulp.watch('src/**/*.css', browserSync.reload);
});

gulp.task('default', ['watch']);
