function() {
  return simplyDataApi.listMergedPages()
    .catch(function(error) {
    return [];
  });
}