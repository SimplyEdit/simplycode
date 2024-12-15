function() {
  return simplyDataApi.listDirectories(simplyRawApi.projectUrl + "components/")
  .then(function(components) {
    let promises = [];
    components.forEach(function(componentPath) {
	  promises.push(
        simplyRawApi.get(componentPath + "meta.json")
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function(result) {
          return simplyDataApi.listContents(componentPath)
          .then(function(contents) {
            result.contents = contents;
            return result;
          });
        })
      );
    });    
    return Promise.all(promises);
  });
}