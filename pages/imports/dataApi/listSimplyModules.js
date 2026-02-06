function() {
  return simplyRawApi.get("simply-modules")
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("listSimplyModules failed", response.status);
  })
  .then(function(simplyModules) {
    simplyModules.forEach(function(moduleGroup) {
      moduleGroup.contents.forEach(function(module) {
        module.contents.forEach(function(moduleComponentCategory) {
          switch(moduleComponentCategory.id) {
            case "components":
              moduleComponentCategory.contents.forEach(function(component) {
                simplyDataApi.mergeComponent(component.contents);
                component.description = component.contents.description;
                component.baseType = 'component';
              });
            break;
            case "base-components":
              moduleComponentCategory.contents.forEach(function(component) {
                simplyDataApi.mergeComponent(component.contents);
                component.description = component.contents.description;
                component.baseType = 'baseComponent';
              });
            break;
            case "pages":
              moduleComponentCategory.contents.forEach(function(component) {
                simplyDataApi.mergeComponent(component.contents);
                component.description = component.contents.description;
                component.baseType = 'page';
              });
            break;
            case "builders":
              moduleComponentCategory.contents.forEach(function(component) {
                simplyDataApi.mergeComponent(component.contents);
                component.description = component.contents.description;
                component.baseType = 'builder';
              });
            case "imports":
              moduleComponentCategory.contents.forEach(function(component) {
                simplyDataApi.mergeComponent(component.contents);
                component.description = component.contents.description;
                component.baseType = 'import';
              });
            break;
          }
        });
      });
    });
    return simplyModules;
  });
}