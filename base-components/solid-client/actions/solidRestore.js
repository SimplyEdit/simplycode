function(el) {
  if (localStorage.webIdProvider) {
    editor.pageData.webIdProvider = localStorage.webIdProvider;
    simplyApp.actions.solidLogin(
      editor.pageData.webIdProvider,
      document.location.href + "#view"
    );
  }
}