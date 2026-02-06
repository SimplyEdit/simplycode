function() {
  return simplyDataApi.listMergedComponents()
    .catch(function(error) {
    return [];
  });
}