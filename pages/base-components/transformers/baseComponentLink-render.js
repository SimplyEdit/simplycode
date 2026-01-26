function(data) {
    this.simplyData = data;
    let componentData = this.dataBinding.config.data;
    if (typeof componentData.imported !== "undefined" && componentData.imported) {
      return {
        href: "#module/" + componentData.moduleGroup + "/" + componentData.module + "/base/" + data,
        innerHTML: data
      };
    } else {
      return {
        href : "#base/" + data,
        innerHTML: data
      };
    } 
}
