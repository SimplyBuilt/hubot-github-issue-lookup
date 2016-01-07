import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';

gulp.task('babel', () => {
    gulp.src('index.babel.js').
        pipe(babel()).
        pipe(rename((path) => { path.basename = 'index' })).
        pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', ['babel']);
