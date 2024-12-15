function(endpoint, params={}, body) {
  if (solidClientAuthentication.default.getDefaultSession().info.isLoggedIn) {
    return solidClientAuthentication.default.fetch(simplyRawApi.url + endpoint, {
      mode : 'cors',
      headers: this.headers,
      method: "POST",
      redirect: "manual",
      body: body
    });
  }
}