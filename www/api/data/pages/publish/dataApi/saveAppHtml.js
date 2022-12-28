function(appHtml) {
  return simplyRawApi.putRaw("generated.html", {}, appHtml)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("saveAppHtml failed", response.status);
  });
}