function() {
  return simplyRawApi.get("pages")
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("listPages failed", response.status);
  });
}