function() {
  var promises = [];
  return simplyApp.actions.listComponents()
    .then(function(components) {
    components.forEach(function(component) {
      promises.push(simplyApp.actions.getComponent(component.id));
    });
  })
    .then(function() {
    return Promise.all(promises);
  });
}