function(part) {
 return simplyRawApi.delete(simplyRawApi.projectUrl + "page-frame/" + part)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("deletePageFramePart failed", response.status);
  });
}