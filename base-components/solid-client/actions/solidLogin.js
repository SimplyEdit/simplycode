function(webIdProvider, returnPage) {
  if (!solidClientAuthentication.default.getDefaultSession().info.isLoggedIn) {
    solidClientAuthentication.default.login({
      // Specify the URL of the user's Solid Identity Provider;
      // e.g., "https://login.inrupt.com".
      oidcIssuer: webIdProvider,
      // Specify the URL the Solid Identity Provider should redirect the user once logged in,
      // e.g., the current page for a single-page app.
      redirectUrl: document.location.href.split("#")[0], // returnPage,
      // Provide a name for the application when sending to the Solid Identity Provider
      clientName: "Pod provisioner"
    })
    .then(function() {
      editor.pageData.webId = solidClientAuthentication.default.getDefaultSession().info.webId;
    });
  } else {
    editor.pageData.webId = solidClientAuthentication.default.getDefaultSession().info.webId;
    document.location.href = returnPage;
  }
}