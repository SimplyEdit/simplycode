function(data) {
  this.simplyData = data;
  if (this.hasAttribute("data-indent")) {
    var indent = " ".repeat(this.getAttribute("data-indent"));
    data = data.replace(/\n/g, "\n" + indent);
  }
  data = data.replace(/\t/g, "  ");
  var dataDiv = document.createElement("div");
  dataDiv.appendChild(document.createTextNode(data));
  return dataDiv.innerHTML;
}