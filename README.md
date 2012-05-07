#API Documentor#

Api Documentor is a simple javascript/html workbench to help you easily document your api.

<a href="http://paduc.github.com/apidoc/example/">See live example</a>

_Please feel free to add or fix things!_

##Features##
<ul>
  <li>Describe your api in full detail in a json file</li>
  <li>Group your actions into sections</li>
  <li>Syntax-highlighted JSON samples of your inputs and outputs</li>
  <li>Generated summary of your sections and actions</li>
</ul>

##How it works##
Take a look at the example.
- __scheme.json__ contains the description of the api.
- __index.html__ loads scheme.json through api documentor and contains all the templates

```javascript
var AD = new ApiDocumentor({
  // templates, don't bother if you like them the way they are
  section_template: $('#section-template').html(),
  action_template: $('#action-template').html(),
  example_template: $('#example-template').html(),
  
  // wherever you want the api actions to be appended
  target: $(".main"), 
  
  // set to true if you want a summary to be generated
  generateSummary: true, 
  
  // where you want the summary to be appended (if generateSummary: true)
  summaryTarget: $('.summary-container'), 
  
  // set to true if you want to load external fixtures automatically
  // if set to false, loads when user clicks
  autoLoadFixtures: true 
});

// load the scheme file
AD.fetch('scheme.json');
```
    
    
- __fixtures/__ contains some request samples mentionned in scheme.json
- __css/style.css__ contains all styles (including css normalize)
- __css/theme.css__ gives a gist-like highlighting to the json samples

##Dependencies##
<ul>
  <li><a href="http://jquery.com/">jQuery</a></li>
  <li><a href="http://documentcloud.github.com/underscore/">Underscore</a>: templating and utilities</li>
  <li><a href="http://craig.is/making/rainbows">Rainbowjs</a>: code highlighting</li>
</ul>

##Licence##
Everything is Public Domain. Use it as you like. A link to this project would be appreciated.
