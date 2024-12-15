async function(webId) {
  let response = await fetch(webId, {
    headers : {
      "Content-Type" : "text/turtle"
    }
  });

  if (!(response.status > 199 && response.status < 300)) {
    throw new Exception("Failed to load profile");
  }

  profile = await response.text();
  let rdfStore = new $rdf.graph();
  $rdf.parse(
    profile,
    rdfStore,
    webId,
    "text/turtle"
  );

  issuer = rdfStore.match(
    null,
    rdfStore.sym("http://www.w3.org/ns/solid/terms#oidcIssuer"), // find things that have a type 'Storage'
    null,
    null
  );

  return await simplyApp.actions.solidLogin(issuer[0].object.value);
}