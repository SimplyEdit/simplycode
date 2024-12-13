async function() {
  var appData = await simplyApp.actions.getAppData();
  appData.builderTemplates.forEach(function(builderTemplate) {
    let buildContents = simplyApp.actions.build(builderTemplate.code, appData);
    simplyApp.actions.saveBuild("dist/" + builderTemplate.base + "/" + builderTemplate.builder, buildContents)
    .then(function() {
      editor.pageData.alerts.unshift({
        "data-simply-template" : "info",
        "message" : builderTemplate.base + "/" + builderTemplate.builder + " published!",
        "state" : "new"
      });
    });
  });
}   