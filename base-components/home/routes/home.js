async function() {
  if (
    document.location.search.match("code") ||
    document.location.search.match("state")
  ) {
    await solidClientAuthentication.default.handleIncomingRedirect({ restorePreviousSession : true });
    document.location.hash = "#components/";
  } else {
    editor.pageData.login = {
      "webId" : "https://ylebre.solidcommunity.net/profile/card#me"
    };
    editor.pageData.page = "login";
  }
}