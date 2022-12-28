function() {
  return simplyDataApi.listComponents()
    .catch(function(error) {
    return [];
  });
}