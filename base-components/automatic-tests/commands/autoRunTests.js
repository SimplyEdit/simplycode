function(el) {
  var testRunners = document.querySelectorAll(".simplycode-component[open] iframe.qunit");
  testRunners.forEach(function(testRunner) {
    testRunner.contentWindow.document.testRunner = testRunner;
    simplyApp.commands.resetTests(testRunner)
    .then(function(testRunner) {
      testRunner.contentWindow.document.testRunner = testRunner;
      testRunner.contentWindow.document.open();
      testRunner.contentWindow.document.write(testRunner.parentNode.querySelector(".qunit-code").innerText);
      testRunner.contentWindow.document.close();
    });
  });
}