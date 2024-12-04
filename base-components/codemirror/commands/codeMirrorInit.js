function() {
  var textareas = document.querySelectorAll(".simplycode-component[open] textarea[data-codemirror-mode]:not([style])");
  textareas.forEach(function(textarea) {
    var mode = "javascript";
    if (textarea.hasAttribute("data-codemirror-mode")) {
      mode = textarea.getAttribute("data-codemirror-mode");
    }
    switch (mode) {
      case "css":
        // no change needed
        break;
      case "html":
        mode = {
          name: "html",
          htmlMode : true,
          matchClosing : true
        }
        break;
      case "htmlmixed":
        mode = {
          name: "htmlmixed",
          tags: {
            style: [[null, null, "css"]],
            script: [[null, null, "javascript"]]
          }
        };
        break;
      case "javascript":
        // no change needed
        break;
      case "json":
        mode = {
          name : "javascript",
          json : true
        };
        break;
      default:
        mode = "javascript";
        break;
    }
    var cm = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      theme: "base16-dark",
      mode: mode
    });
    cm.on("change", function(event) {
      cm.getTextArea().dataBinding.set(cm.getValue());
    });
  });
}