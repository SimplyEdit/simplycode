function() {
  return simplyDataApi.listBaseComponents()
    .catch(function(error) {
    return [];
  });
}