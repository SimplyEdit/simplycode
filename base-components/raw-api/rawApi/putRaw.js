function(endpoint, params={}, body) {
  let headers = this.headers;
  if (endpoint.match(/\.html$/)) {
    headers['Content-Type'] = "text/html";
  }
  if (solidClientAuthentication.default.getDefaultSession().info.isLoggedIn) {
    return solidClientAuthentication.default.fetch(simplyRawApi.url + endpoint, {
      mode: 'cors',
      headers: headers,
      method: "PUT",
      redirect: "manual",
      body: body
    });
  }
}