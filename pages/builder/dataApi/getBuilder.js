function(component) {
  var subject = simplyRawApi.projectUrl + "builders/" + component + "/";
  return simplyDataApi.listContents(subject)
  .then(function(component) {
    return simplyDataApi.mergeComponent(component);
  });
}