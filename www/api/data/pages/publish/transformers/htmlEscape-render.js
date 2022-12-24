function(data) {
  this.simplyData = data;
  if (this.hasAttribute("data-indent")) {
    var indent = " ".repeat(this.getAttribute("data-indent"));
    data = indent + data.replace(/\n/g, "\n" + indent);
  }
  var dataDiv = document.createElement("div");
  dataDiv.appendChild(document.createTextNode(data));
  return dataDiv.innerHTML;
}