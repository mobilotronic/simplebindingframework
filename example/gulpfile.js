const webpack_stream = require('webpack-stream');
const webpack_config = require("./webpack.config.js");
const gulp = require('gulp');



function buildWebPack(){
    return webpack_stream(webpack_config).pipe(gulp.dest("./src/output"));
}


function copyfilesToOutput(){
    gulp.src("./src/views/**/*").pipe(gulp.dest("./src/output/views"))
    gulp.src("./src/content/**/*").pipe(gulp.dest("./src/output/content"))
    gulp.src("./src/locales/**/*").pipe(gulp.dest("./src/output/locales"))
    return  gulp.src("./src/startup.js").pipe(gulp.dest("./src/output"))
}

gulp.task("buildWebPack",gulp.series([buildWebPack,copyfilesToOutput]));