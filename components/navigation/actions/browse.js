function(path) {
  return simplyDataApi.browse(path)
    .catch(function(error) {
    return [];
  });
}