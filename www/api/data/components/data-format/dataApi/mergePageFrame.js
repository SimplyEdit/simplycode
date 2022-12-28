function(component) {
  var contents = {};
  component.forEach(function(partFile) {
    if (partFile.id.match(/\.html$/)) {
      partFile.id = partFile.id.replace(/\.html$/, '');
    }
  });
  return component;
}