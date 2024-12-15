async function() {
  return await simplyDataApi.listComponents()
    .catch(function(error) {
    return [];
  });
}