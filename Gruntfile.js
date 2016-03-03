module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-prettyprinter');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['htmlmin', 'less', 'jshint', 'uglify', 'imagemin', 'watch']);
  grunt.initConfig({
//less task
less: {
  development: {
    options: {
      compress: true,
      yuicompress: true,
      optimization: 2
    },
    files: {
"../style.css": "source/less/style.less", // destination file and source file
}
}
},
//validation js task
jshint: {
  development: {
    options: {
      globals: {
        jQuery: true,
        compress: true,
        yuicompress: true,
        optimization: 2
      }
    },
    files: {'../js/custom.min.js' : 'source/js/**/*.js'}
  }
},
// minify js task
uglify: {
  my_target: {
    files: {
'../js/custom.min.js': ['source/js/**/*.js']  //file directory to save minifyed files
}
}
},
// minify html task
htmlmin: {
dist: {
options: {
  removeComments: true,
  collapseWhitespace: true
},
files: { // Dictionary of files 
  '../template-home-source.html': 'index.html'
}
},
dev: { // Another target 
  files: {
    '../template-home-source.html': 'index.html'
  }
}
},
// html prettyprinter task
'html-prettyprinter': {
  custom: {
    src: 'index.html',
    dest: '../template-home-source.html',
    options: {
      indent_size: 2,
      indent_char: ' ',
      unformatted: ['sub', 'sup', 'b', 'i']
    }
  }
},
//image minimization task
imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'source/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: './'
    }]
    }
},
watch: {
  styles: {
files: ['source/less/**/*.less', 'source/js/**/*.js', '**/*.html'], // which files to watch
tasks: ['less', 'jshint', 'uglify', 'htmlmin', 'html-prettyprinter', 'imagemin'], // tasks for watching
options: {
  nospawn: true
}
}
}
});
};