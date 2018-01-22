// PostHTML
return gulp.src('index.html')
    .pipe(posthtml([
        require('posthtml-minifier')({
            collapseWhitespace: true
        })
    ]));

// PostCSS
return gulp.src('style.css')
    .pipe(postcss([
        require('postcss-import')(),
        require('postcss-url')(),
        require('autoprefixer')(),
        require('postcss-csso')(),
    ]));