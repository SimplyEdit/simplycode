function(component) {
    return simplyRawApi.delete(simplyRawApi.projectUrl + "components/" + component + "/")
    .then(function(response) {
        if (response.ok) {
            return true;
        }
        throw new Error("deleteComponent failed", response.status);
    });
}