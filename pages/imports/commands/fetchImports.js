function() {  
  editor.pageData.alerts.unshift({
    "data-simply-template" : "info",
    "message" : "Installing imports...",
    "state" : "new"
  });
  var promises = [];
  simplyApp.actions.listImports()
  .then(function(modules) {
    modules.forEach(function(module) {
      module.contents.forEach(function(componentPart) {
        if (componentPart.id === "importUrls") {
          let importUrls = JSON.parse(componentPart.contents);
          importUrls.forEach(function(importUrl) {
            let targetPath = "simply-modules/" + module.id + "/" + importUrl.import + "/";
            promises.push(simplyApp.actions.fetchImport(importUrl.url, targetPath));
          });
        }
      });
    });
  })
  .then(function() {
    return Promise.all(promises);
  })
  .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Installation done!",
      "state" : "new"
    });
  });
}