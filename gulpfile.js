//Задаем переменные, обозначающие папку ресурсов и папку вывода
const projectFolder = 'dist';
const rootFolder = 'src';


//Для удобства создаем объект, содержащий пути до папок.
//В случае изменения пути не придется изменять его по всему файлу
const path = {
    build: {
        html: projectFolder + '/',
        css: projectFolder + '/css',
        img: projectFolder + '/images',
        js: projectFolder + '/js'
    },
    src: {
        html: rootFolder + '/*.html',
        css: rootFolder + '/sass/style.sass',
        img: rootFolder + '/images/*',
        js: rootFolder + '/js/*.js'
    },
    watch: {
        html: rootFolder + '/index.html',
        css: rootFolder + '/sass/*.sass',
        img: rootFolder + '/images',
        js: rootFolder + '/js/*.js'
    },
    //Путь для очистки выходной директории, чтобы туда не попадало лишнее
    clean: './' + projectFolder + '/'
}

// Объявляем переменные
let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    del = require('del'),
    sass = require('gulp-sass')(require('sass'))


//Пишем сценарий для плагина BrowserSync
function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + projectFolder +'/'
        },
        port: 3000,
        notify: false
    })
}

//Пишем функцию для отслеживания изменений в нужных директориях и запуска нужных сценариев
function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.js], js)
}

//Функция очистки (через плагин del)
function clean (params) {
    return del(path.clean);
}

//Переносим в папку dist html файл
function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

//Переносим в папку dist файл sass, преобразуя его в css
function css() {
    return src(path.src.css)
        .pipe(
            sass({
                outputStyle: 'expanded'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}
function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

//Переносим все изображения в dist
function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

//Пишем очередность выполнения сценариев - сначала очистка, потом одновременный
//перенос html, css, img
let build = gulp.series(clean, gulp.parallel(html, css, images, js));
let watch = gulp.parallel(build, watchFiles, browserSync);

//т.к. gulp.task не использовался, необходимо явно указать gulp на функции сценария
exports.js = js;
exports.images = images;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
    