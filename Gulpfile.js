var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    sass       = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    chalk = require('chalk'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    scripts: ['app/**/*.jsx'],
    sass: ['app/**/*.s?ss'],
    main_script: 'app/main.js',
    main_sass: 'app/styles/main.scss',
    output: 'public'
};

gulp.task('scripts', function () {
    return gulp.src([paths.main_script])
        .pipe(browserify({
            debug: true,
            transform: [ 'reactify' ]  // 'babelify'
        }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('fonts', function() {
    return gulp.src('app/styles/fonts/*').pipe(gulp.dest(paths.output + '/fonts'));
})

gulp.task('sass', function () {
    return gulp.src([paths.main_sass])
        .pipe(sass())
        .pipe(gulp.dest(paths.output));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('server', function() {
    nodemon({
        script: 'server.js',
        ext: 'html js',
        ignore: [
            'node_modules/**/*',
            'webpack.config.js',
            'gulpfile.js',
            'assets/**/*'
        ]
    })
    .on('restart', function () {
        console.log(chalk.green('Server Restarted'));
    });
});

gulp.task('default', ['scripts', 'fonts', 'sass', 'watch', 'server']);
