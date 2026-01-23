function(component) {
  return simplyRawApi.delete("imports/" + component)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("deleteImport failed", response.status);
  });
}