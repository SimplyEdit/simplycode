function() {
  return simplyDataApi.listDirectories(simplyRawApi.projectUrl + "builders/")
  .then(function(components) {
    let promises = [];
    components.forEach(function(componentPath) {
	  promises.push(
        simplyRawApi.get(componentPath + "meta.json")
        .then(function(response) {
          if (response.status === 200) {
            return response.json();
          }
        })
      );
    });    
    return Promise.all(promises);
  });
}