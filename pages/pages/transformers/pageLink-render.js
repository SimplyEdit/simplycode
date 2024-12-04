function(data) {
  this.simplyData = data;
  return {
    href : "#pages/" + data,
    innerHTML: data
  };
}