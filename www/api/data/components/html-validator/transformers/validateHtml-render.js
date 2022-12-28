function(data) {
  this.simplyData = data;
  var element = this;
  let htmlData = "<!doctype html><html lang='en'><head><title>Test</title></head><body>" + data + "</body></html>";
  if (typeof element.validateTimeout !== "undefined") {
    window.clearTimeout(element.validateTimeout);
  }
  element.validateTimeout = window.setTimeout(function() {
    fetch("https://validator.w3.org/nu/?out=json", {
      mode : 'cors',
      headers: {
        "Content-type" : "text/html; charset=utf-8"
      },
      method: "POST",
      body: htmlData
    })
      .then(function(result) {
      return result.json();
    })
      .then(function(validateResult) {
      element.dataBinding.config.data.validateResult = validateResult;
      if(validateResult.messages.length) {
        element.className = "sb-html-invalid";
        element.innerHTML = "HTML validation failed:";
      } else {
        element.innerHTML = "HTML validated!";
        element.className = "sb-html-valid";
      }
    });
  }, 1000);
  element.dataBinding.config.data.validateResult = {};
  return "Validating...";
}