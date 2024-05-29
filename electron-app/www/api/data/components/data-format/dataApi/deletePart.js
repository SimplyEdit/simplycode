function(basePath, part) {
  switch (part) {
    case "meta":
      return simplyRawApi.delete(basePath + "/meta.json");
      break;
    default:
      return simplyRawApi.delete(basePath + "/" + part);
      break;
  }
}