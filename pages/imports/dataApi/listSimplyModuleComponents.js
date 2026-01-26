function() {
  return simplyRawApi.get("simply-modules")
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("listSimplyModules failed", response.status);
  })
    .then(function(simplyModules) {
    let components = [];
    simplyModules.forEach(function(moduleGroup) {
      moduleGroup.contents.forEach(function(module) {
        module.contents.forEach(function(moduleComponentCategory) {
          switch(moduleComponentCategory.id) {
            case "components":
              moduleComponentCategory.contents.forEach(function(component) {
                simplyDataApi.mergeComponent(component.contents);
                component.description = component.contents.description;
                component.baseType = 'component';
                component.moduleGroup = moduleGroup.id;
                component.module = module.id;
                components.push(component);
              });
            break;
          }
        });
      });
    });
    return components;
  });
}