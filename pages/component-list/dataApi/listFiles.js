function(subject) {
  return simplyRawApi.get(subject)
    .then(async function(response) {
    if (response.ok) {
      turtleResponse = await response.text();
      let rdfStore = new $rdf.graph();
      $rdf.parse(
        turtleResponse,
        rdfStore,
        subject,
        "text/turtle"
      );

      contains = rdfStore.match(
        rdfStore.sym(subject), // subject
        rdfStore.sym("http://www.w3.org/ns/ldp#contains"), // find things that have a type 'Storage'
        null,
        null
      );

      return contains.map(function(entry) {
        if (rdfStore.match(
          rdfStore.sym(entry.object.value),
          null,
          rdfStore.sym("http://www.w3.org/ns/ldp#BasicContainer"),
          null
        ).length) {          
          return;
        } else {
          return entry.object.value;;
        }
      })
      .filter(function(entry) {
        return entry;
      });
    }
    throw new Error("listFiles failed", response.status);
  })
}