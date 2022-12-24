function() {
  var appData = {
  };
  return simplyApp.actions.getPageFrame()
    .then(function(component) {
    var frame = {};
    component.forEach(function(part) {
      if (part.id == "meta") {
        return;
      };
      frame[part.id] = JSON.parse(part.contents);
    });
    appData.pageFrame = frame;
  })
  .then(function() {
    var promises = [
      simplyApp.actions.getBaseComponents(),
      simplyApp.actions.getComponents(),
      simplyApp.actions.getPages()
    ];
    return Promise.all(promises);
  })
  .then(function(appComponents) {
    appComponents.forEach(function(appComponent) {
      appComponent.forEach(function(component) {
        component.forEach(function(part) {
          if (part.id == "meta") {
            return;
          };

          if (typeof appData[part.id] === "undefined") {
            appData[part.id] = [];
          }
          parts = JSON.parse(part.contents);
          parts.forEach(function(entry) {
            appData[part.id].push(entry);
          });
        });
      });
    });
  })
  .then(function() {
    if (appData["routes"]) {
      appData["routes"].sort(function(a, b) {
        routeAWeight = simplyApp.actions.getRouteWeight(a);
        routeBWeight = simplyApp.actions.getRouteWeight(b);
        if (routeAWeight > routeBWeight) {
          return -1;
        } else if (routeAWeight < routeBWeight) {
          return 1;
        } else {
          if (a > b) {
            return -1;
          } else if (a < b) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    }
    return appData;
  });
}