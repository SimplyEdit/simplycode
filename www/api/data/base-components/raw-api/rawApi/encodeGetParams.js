function(params) {
  if (!params) {
    return "";
  }
  return Object.entries(params).map(function(keyvalue) {
    return "?" + keyvalue.map(encodeURIComponent).join("=")
  }).join("&");
}