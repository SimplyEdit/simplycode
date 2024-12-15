function(endpoint, params={}) {
  if (solidClientAuthentication.default.getDefaultSession().info.isLoggedIn) {
    return solidClientAuthentication.default.fetch(simplyRawApi.url + endpoint + simplyRawApi.encodeGetParams(params), {
      mode : 'cors',
      headers: this.headers,
      redirect: "manual",
      method: "DELETE"
    });
  }
}