module.exports = function(grunt) {

    /*
        Setting Initial Directory Structure
            dev: for development
            build: for final build
     */
    var dev = {
        dev: '',
        sass: '',
        js: '',
        svg: 'icon/',
        view: 'application/views/'
    };
    var build = {
        build: '',
        mins: '',
        css: '',
        js: '',
        svg: '',
        view: 'application/views_parsed',
        img: 'public/asset/img'
    };

    /*
        Starting Project Configuration
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
            calling initial configure setting
         */
        build: build,
        dev: dev,



        /*
            calling JSON files for the mobile and desktop
         */
       //mobile: grunt.file.readJSON('public/asset/_include/mobile.json'),
        //desktop: grunt.file.readJSON('public/asset/_include/desktop.json'),


        /*
            Starting Task Configuration
         */
        clean: {
            options: {
                force: true
            },
            build: ["<%= build.css %>*.css","<%= build.css %>*.map"]
        },

        /*
            svgstore to make a working sprite of the svg file
         */
        svgstore: {
            options: {
                prefix: 'icon-', // This will prefix each ID
                cleanup: false,
                cleanupdefs: [],
                svg: {
                    style: "display:none;",
                    version: '1.1',
                    xmlns: 'http://www.w3.org/2000/svg'
                }
            },
            build: {
                files: {
                    "<%= build.svg %>icon.svg": ["<%= dev.svg %>*.svg"]
                }
            }
        },

        /*
            Convert all sass files to the build css files
         */
        sass: {
            build: { // Target
                options: { // Target options
                    style: 'compressed',
                    update: true
                },
                files: [{
                    expand: true,
                    cwd: "<%= dev.sass %>",
                    src: ["*.scss"],
                    dest: "<%= build.css %>",
                    ext: ".css"
                }]
            }
        },
        /*
            Add all browser prefix to the css file
         */
        autoprefixer: {
            build: {
                files: [{
                    expand: true,
                    cwd: "<%= build.css %>",
                    src: ["*.css"],
                    dest: "<%= build.css %>"
                }]
            }
        },
        /*
           minified All CSS files in the build 
         */
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: "<%= build.css %>",
                    src: ["*.css"],
                    dest: "<%= build.mins %>",
                    ext: ".min.css"
                }]
            }
        },
        /*
            Add watch to watch all files in section
         */
        watch: {
            svgstore: {
                files: '<%= dev.svg %>*.svg',
                tasks: ['svgstore']
            },
            sass: {
                files: ['<%= dev.sass %>**/*.scss'],
                tasks: ['sass','autoprefixer','cssmin']
            }
        }
    });

    grunt.registerTask('default', ['clean','svgstore','sass','autoprefixer','cssmin', 'watch']);
    grunt.registerTask('run', ['clean','svgstore','sass','autoprefixer','cssmin', 'watch']);

    // load the task in to the npm
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-rename');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-shell');
};
