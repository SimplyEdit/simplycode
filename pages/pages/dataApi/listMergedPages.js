async function() {
  let moduleComponents;
  let localComponents;

  try {
    moduleComponents = await simplyDataApi.listSimplyModulePages();
  } catch(e) {
    moduleComponents = [];
  }

  try {
    localComponents = await simplyDataApi.listPages();
  } catch(e) {
    localComponents = [];
  } 
  
  let componentIndex = {};
  let result = [];

  moduleComponents.forEach(function(component) {
    componentIndex[component.id] = component;
    component.imported = true;
    result.push(component);
  });

  localComponents.forEach(function(localComponent) {
    if (typeof componentIndex[localComponent.id] !== "undefined") {
      // FIXME: Merge the module + local component;
      let mergedComponent = {};
      
      componentIndex[localComponent.id].contents.forEach(function(componentPart) {
        if (typeof mergedComponent[componentPart.id] === "undefined") {
          mergedComponent[componentPart.id] = {};
        }
        let parts = JSON.parse(componentPart.contents);
        let nameField = simplyApp.actions.getComponentNameField(componentPart.id);
        if (Array.isArray(parts)) {
          parts.forEach(function(part) {
            mergedComponent[componentPart.id][part[nameField]] = part;
          });
        }
      });
      localComponent.contents.forEach(function(componentPart) {
        if (typeof mergedComponent[componentPart.id] === "undefined") {
          mergedComponent[componentPart.id] = {};
        }
        let parts = JSON.parse(componentPart.contents);
        let nameField = simplyApp.actions.getComponentNameField(componentPart.id);
        if (Array.isArray(parts)) {
          parts.forEach(function(part) {
            mergedComponent[componentPart.id][part[nameField]] = part;
          });
        }
      });
      
      componentIndex[localComponent.id].contents = [];
      Object.keys(mergedComponent).forEach(function(componentPart) {
        let content = [];
        Object.values(mergedComponent[componentPart]).forEach(function(part) {
          content.push(part);
        });
        let mergedPart = {
          "id" : componentPart,
          "contents" : JSON.stringify(content)
        };
        componentIndex[localComponent.id].contents.push(mergedPart);
      });
    } else {
      result.push(localComponent);
    }
  });
  return result;
}