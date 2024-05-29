function(params) {
  editor.pageData.app = {};
  simplyApp.actions.getAppData()
    .then(function(appData) {
    editor.pageData.app = appData;
    editor.pageData.page = "preview-app";
  })
    .then(function() {
    simplyApp.commands.autoRunPreviews();
  });
}