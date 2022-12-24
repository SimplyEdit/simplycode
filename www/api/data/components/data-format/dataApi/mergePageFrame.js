function(component) {
  var contents = {};
  component.contents.forEach(function(partFile) {
    if (partFile.id.match(/\.html$/)) {
      partFile.id = partFile.id.replace(/\.html$/, '');
    }
  });
}