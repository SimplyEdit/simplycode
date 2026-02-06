function() {
  return simplyDataApi.listImports()
    .catch(function(error) {
    return [];
  });
}