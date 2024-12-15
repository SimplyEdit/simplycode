function(component) {
  var subject = simplyRawApi.projectUrl + "pages/" + component + "/";
  return simplyDataApi.listContents(subject)
  .then(function(component) {
    return simplyDataApi.mergeComponent(component);
  });
}