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
"../style.css": "source/less/style.less", // first way - compiled css, second - less file(s)
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
    files: {'../js/custom.min.js' : 'source/js/**/*.js'} // first way compiled file, second source code
  }
},
// Task for minify and compress js file`s
uglify: {
  my_target: {
    files: {
'../js/custom.min.js': ['source/js/**/*.js']  //file directory to save minifyed files
}
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
  '../template-home-source.html': 'index.html'
}
},
dev: { // Another target 
  files: {
    '../template-home-source.html': 'index.html'
  }
}
},
// Task for beautyfy HTML code
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
//Task for minify images
imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'source/', // way where to search the images
            src: ['**/*.{png,jpg,gif,svg}'], // formats for convert
            dest: './' //folder for save result
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
