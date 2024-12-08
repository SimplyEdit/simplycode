function() {
  return simplyDataApi.listBuilders()
    .catch(function(error) {
    return [];
  });
}