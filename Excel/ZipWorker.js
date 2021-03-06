'use strict';

var JSZip = require('jszip');

var onmessage = function(event) {
  var zip = new JSZip();
  var files = event.data.files;
  for (var path in files) {
    var content = files[path];
    path = path.substr(1);
    zip.file(path, content, {base64: false});
  };

  postMessage({
    base64: !!event.data.base64
  });

  postMessage({
    status: 'done',
    data: zip.generate({
      base64: !!event.data.base64
    })
  });
};

module.exports = {
  onmessage: onmessage
};