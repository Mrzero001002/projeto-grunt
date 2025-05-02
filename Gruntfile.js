const { watch } = require("less");

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development:  {
                // O grunt dependede do ambiente aonde está sendo executado.
                files: {
                    'dev/style/main.css': 'src/style/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/style/main.min.css': 'src/style/main.less'
                }
            }
        },
        watch:{
            less:{
                files: ['src/style/**/*.less'],
                // ** é para qualquer pasta dentro do Styles; * é para qualquer arquivo dentro de qualquer pasta, dentro dos styles.
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace:{
            dev: {
                options: {
                    patterns:[
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './style/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/script/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns:[
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './style/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './script/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin:{
            dist: {
                options:{
                    removecoments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html' : 'src/index.html'
                }
            }
        },
        clean:['prebuild'],
        uglify:{
            target:{
                files:{
                    'dist/script/main.min.js': ['src/script/main.js']
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}