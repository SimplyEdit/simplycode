function() {
  return new Promise(function(resolve, reject) {
    return resolve(
      [
        {
          item : {
            innerHTML : "Base components",
            href : "#base",
            "data-path" : "base-components"
          }
        },
        {
          item : {
            innerHTML : "Components",
            href : "#components",
            "data-path" : "components"
          }
        },
        {
          item : {
            innerHTML : "Page frame",
            href : "#page-frame",
            "data-path" : "page-frame"
          }
        },
        {
          item : {
            innerHTML : "Pages",
            href : "#pages",
            "data-path" : "pages"
          }
        }
      ]
    );
  });
}