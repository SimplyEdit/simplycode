function(component) {
  return simplyRawApi.delete("builders/" + component)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("deleteBuilder failed", response.status);
  });
}