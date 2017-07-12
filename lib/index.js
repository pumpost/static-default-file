"use strict";
var DefaultFile = function(path) {
  this.path = path || '';

  this.setDefaultFile = this.setDefaultFile.bind(this);
  this.index = this.index.bind(this);
};

DefaultFile.prototype.setDefaultFile = function (file) {
  var targetFile = file || '';
  return (req, res, next) => {
    if(req.originalUrl.substr(-1) !== '/' && req.originalUrl.indexOf('.') === -1) {
      var uri = req.originalUrl.replace(/\/+$/, '');
      res.redirect(req.protocol + '://' + req.get('host') + this.path + uri + '/' + targetFile);
    } else {
      next();
    }
  }
};

DefaultFile.prototype.index = function (req, res, next) {
  return this.setDefaultFile('index.html')(req, res, next);
};

var staticDefaultFile = function(path) {
  return new DefaultFile(path);
};

module.exports = staticDefaultFile;