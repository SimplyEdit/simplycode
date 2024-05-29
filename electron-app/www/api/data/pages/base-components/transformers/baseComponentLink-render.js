function(data) {
  this.simplyData = data;
  return {
    href : "#base/" + data,
    innerHTML: data
  };
}