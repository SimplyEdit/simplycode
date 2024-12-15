function(appHtml) {
  let result = simplyRawApi.putRaw(simplyRawApi.projectUrl + "generated.html", {}, appHtml)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("saveAppHtml failed", response.status);
  });
  return result;
}