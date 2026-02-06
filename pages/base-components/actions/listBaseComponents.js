function() {
  return simplyDataApi.listMergedBaseComponents()
    .catch(function(error) {
    return [];
  });
}