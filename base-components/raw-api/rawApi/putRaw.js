function(endpoint, params={}, body) {
  if (!params.token && editor.pageData.token) {
    params.token = editor.pageData.token;
  }
  if (params.token) {
    this.headers['Authorization'] = "Bearer " + params.token;
    delete params.token;
  } else {
    delete this.headers.Authentication;
  }
  return fetch(simplyRawApi.url + endpoint + "/", {
    mode: 'cors',
    headers: this.headers,
    method: "PUT",
    body: body
  });
}