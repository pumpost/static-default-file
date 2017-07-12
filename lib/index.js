"use strict";
var DefaultFile = function(path) {
  this.path = path || '';
};

DefaultFile.prototype.setDefaultFile = function (file) {
  var targetFile = file || '';
  return (req, res, next) => {
    if(req.originalUrl.substr(-1) !== '/' || file !== '') {
      var uri = req.originalUrl.replace(/\/+$/, '');
      res.redirect(req.protocol + '://' + req.get('host') + this.path + uri + '/' + targetFile);
    } else {
      next();
    }
  }
};

DefaultFile.prototype.index = function () {
  this.setDefaultFile('index.html');
};

var staticDefaultFile = function(path) {
  return new DefaultFile(path);
};

module.exports = staticDefaultFile;