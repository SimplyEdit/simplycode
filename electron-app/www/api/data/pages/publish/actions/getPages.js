function() {
  var promises = [];
  return simplyApp.actions.listPages()
    .then(function(pages) {
    pages.forEach(function(page) {
      promises.push(simplyApp.actions.getPage(page.id));
    });
  })
    .then(function() {
    return Promise.all(promises);
  });
}