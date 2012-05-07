#API Documentor#

Api Documentor is a simple javascript/html workbench to help you easily document your api.

_Please feel free to add or fix things!_

##Features##
<ul>
  <li>Describe your api in full detail in a json file</li>
  <li>Group your actions into sections</li>
  <li>Syntax-highlighted JSON samples of your inputs and outputs</li>
  <li>Generated summary of your sections and actions</li>
</ul>

##How to use it##
Take a look at the example.
- scheme.json contains the description of the api.
- index.html loads scheme.json through api documentor and contains all the templates
- fixtures/ contains some request samples mentionned in scheme.json
- css/style.css contains all styles (including css normalize)
- css/theme.css gives a gist-like highlighting to the json samples

##Dependencies##
<ul>
  <li>[jQuery](http://jquery.com/)</li>
  <li>[Underscore](http://documentcloud.github.com/underscore/): templating and utilities</li>
  <li>[Rainbowjs](http://craig.is/making/rainbows): code highlighting</li>
</ul>

##Licence##
Everything is Public Domain. Use it as you like. A link to this project would be appreciated.