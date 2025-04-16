const { watch } = require("less");

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development:  {
                // O grunt dependede do ambiente aonde está sendo executado.
                files: {
                    'dev/styles/main.css': 'src/style/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/style/main.less'
                }
            }
        },
        watch:{
            less:{
                files: ['src/style/**/*.less'],
                // ** é para qualquer pasta dentro do Styles; * é para qualquer arquivo dentro de qualquer pasta, dentro dos styles.
                tasks: ['less:development']
            }
        },
        replace:{
            dev: {
                options: {
                    patterns:[
                        {
                            watch: 'ENDERECO_DO_CSS',
                            replacement: './style/main.css'
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
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production']);
}