function(component) {
  return simplyRawApi.delete("base-components/" + component)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("deleteComponent failed", response.status);
  });
}