function() {
  editor.pageData.app = {};
  simplyApp.actions.getAppData()
    .then(function(appData) {
    editor.pageData.app = appData;
    editor.pageData.page = "Publish App";
  })
    .then(function() {
    simplyApp.commands.autoRunPreviews();
  });
}