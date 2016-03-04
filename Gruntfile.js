module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-prettyprinter');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['htmlmin', 'less', 'jshint', 'uglify', 'imagemin', 'watch']);
  grunt.initConfig({
//less task (compile and convert less into css)
less: {
  development: {
    options: {
      compress: true,
      yuicompress: true,
      optimization: 2
    },
    files: {
"../release/style.css": "less/style.less", // first way - compiled css, second - less file(s)
}
}
},
//Task for validate js file`s
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
    // files: {'../release/js/custom.min.js' : 'js/**/*.js'} // first way compiled file, second source code
            files: grunt.file.expandMapping(['js/**/*.js'], '../release/', {
            rename: function(destBase, destPath) {
                return destBase+destPath.replace('.js', '.min.js');
            }
        })
  }
},
// Task for minify and compress js file`s
uglify: {
  my_target: {
        files: grunt.file.expandMapping(['js/**/*.js'], '../release/', {
            rename: function(destBase, destPath) {
                return destBase+destPath.replace('.js', '.min.js');
            }
        })
}
},
// Task for minify HTML
htmlmin: {
dist: {
options: {
  removeComments: true,
  collapseWhitespace: true
},
files: { // Dictionary of files 
  '../release/index.php': 'index.html'
}
},
dev: { // Another target 
  files: {
    '../release/index.php': 'index.html'
  }
}
},
// Task for beautyfy HTML code
'html-prettyprinter': {
  custom: {
    src: 'index.html',
    dest: '../release/index.php',
    options: {
      indent_size: 2,
      indent_char: ' ',
      unformatted: ['sub', 'sup', 'b', 'i']
    }
  }
},
//Task for minify images
imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'images', // way where to search the images
            src: ['**/*.{png,jpg,gif,svg}'], // formats for convert
            dest: '../release/images' //folder for save result
    }]
    }
},
watch: {
  styles: {
files: ['less/**/*.less', 'js/**/*.js', '**/*.html'], // which files to watch
tasks: ['less', 'jshint', 'uglify', 'htmlmin', 'html-prettyprinter', 'imagemin'], // tasks for watching
options: {
  nospawn: true
}
}
}
});
};
