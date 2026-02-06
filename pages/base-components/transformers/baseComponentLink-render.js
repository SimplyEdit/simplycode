function(data) {
    this.simplyData = data;
    let componentData = this.dataBinding.config.data;
    if (componentData.moduleGroup && componentData.module) {
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
