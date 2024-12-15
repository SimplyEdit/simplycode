function(component) {
  var subject = simplyRawApi.projectUrl + "base-components/" + component + "/";
  return simplyDataApi.listContents(subject)
  .then(function(component) {
    return simplyDataApi.mergeComponent(component);
  });
}