#!/bin/bash
echo "removing map.html"
rm -i map.html
echo "removing view.js"
rm -i javascript/view.js
echo "copying dev files"
cp map-dev.html map.html
cp javascript/view-dev.js javascript/view.js
echo "replacing text in map.html"
sed -i 's/view-dev.js/view.js/g' map.html