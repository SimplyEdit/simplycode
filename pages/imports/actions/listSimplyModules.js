function() {
  return simplyDataApi.listSimplyModules()
    .catch(function(error) {
    return [];
  });
}