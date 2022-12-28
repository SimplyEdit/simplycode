function() {
  var promises = [];
  return simplyApp.actions.listBaseComponents()
    .then(function(baseComponents) {
    baseComponents.forEach(function(baseComponent) {
      promises.push(simplyApp.actions.getBaseComponent(baseComponent.id));
    });
  })
    .then(function() {
    return Promise.all(promises);
  });
}