function(el) {
  if (el.hasAttribute("href")) {
    document.location.href = el.getAttribute("href");
  } else if (el.querySelector("[href]")) {
    document.location.href = el.querySelector("[href]").getAttribute("href");
  }
}