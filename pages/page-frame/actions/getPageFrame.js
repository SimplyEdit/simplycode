function() {
  return simplyDataApi.getPageFrame()
  .catch(function(error) {
    return [];
  });
}