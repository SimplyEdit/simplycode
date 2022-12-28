function() {
  return simplyDataApi.listPages()
    .catch(function(error) {
    return [];
  });
}