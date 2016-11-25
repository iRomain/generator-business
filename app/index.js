var generators = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var optionOrPrompt = require('yeoman-option-or-prompt');

module.exports = generators.Base.extend({

  _optionOrPrompt: optionOrPrompt,

  constructor: function () {
    
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Skip welcome message
    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

  },


  initializing: function () {
    this.log('initializing is running');
    this.pkg = require('../package.json');
    this.dateCreated = Date();
  },
  

  prompting: function () {

    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('\'Allo \'Allo Welcome to the business generator!'));
    }

    // Ask general questions
    var generalPrompts = [{
      type    : 'input',
      name    : 'businessName',
      message : 'Your Business Name',
      default : _.startCase(this.appname)
    }, {
      type    : 'input',
      name    : 'ownerName',
      message : 'Your Name',
      description : 'Your Name',
      store   : true
    }, {
      type    : 'input',
      name    : 'ownerEmail',
      message : 'Your Email',
      store   : true
    }, {
      type    : 'input',
      name    : 'domainName',
      message : 'Your business domain name:',
      default : _.kebabCase(this.appname) + '.com'
    }, {
      type: 'confirm',
      name: 'generateEngine',
      message: 'Do you wish to bootstrap some code?',
      default: true
    }, {
      type: 'confirm',
      name: 'generateDesign',
      message: 'Do you wish to bootstrap some design?',
      default: false
    }, {
      type: 'confirm',
      name: 'generateMarketing',
      message: 'Do you wish to bootstrap some marketing?',
      default: false
    }, {
      type: 'confirm',
      name: 'generateSEO',
      message: 'Do you wish to generate some SEO?',
      default: false
    }];

    // Prompt general questions
    this._optionOrPrompt(generalPrompts, function (answers) {
      
      this.answers = answers;
      
      done();
    }.bind(this));

  },




  configuring: function () {
    this.log('configuring is running');

    /*
    this.composeWith(this.options['test-framework'] + ':app', {
      options: {
        'skip-install': this.options['skip-install']
      }
    }
    */
  },




  default: function () {
    this.log('default is running');
  },




  writing: function () {
    this.log('writing is running');

    if(this.answers.generateEngine){
      mkdirp('code');
      this.composeWith('engine', { options: this.answers });
    }

    if(this.answers.generateDesign){
      this.composeWith('design', { options: this.answers });
    }



    // Init ReadMe file
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { businessName: this.answers.businessName,
        dateCreated: this.dateCreated,
        ownerName: this.answers.ownerName
      }
    );

  },




  conflicts: function () {
    this.log('conflicts is running');
  },




  install: function () {
    this.log('install is running');
  },




  end: function () {
    this.log('end is running');
  },













  method1: function () {
    this.log('method 1 just ran');
  },
  _method2: function () {
    this.log('method 2 just ran');
  }

});
