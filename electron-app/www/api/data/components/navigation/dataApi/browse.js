function(path) {
  return simplyRawApi.get(path)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("browse failed", response.status);
  });
}