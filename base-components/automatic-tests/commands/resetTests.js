function(el) {
  return new Promise(function(resolve, reject) {
    var newRunner = el.cloneNode(false);
    newRunner.addEventListener("load", function() {
      resolve(newRunner);
    });
    el.parentNode.insertBefore(newRunner, el);
    el.remove();
  });
}