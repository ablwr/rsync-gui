const { dialog } = require('electron').remote

// scriptBuilder

let scriptParts = {
  rsync: "rsync",
  flags: "", // if empty add -, or add at end
  sourceServer: "",
  source: "",
  destServer: "",
  dest: "",
}

function scriptBuilder(scriptParts) {
  builtScript = `${scriptParts.rsync} ${scriptParts.source} ${scriptParts.dest}` 
  console.log(builtScript);
  document.getElementById('showScript').innerHTML = builtScript
}

const buttons = document.querySelectorAll('button')
buttons.forEach(function (b, i){
  b.addEventListener("click", (e) => {
    scriptBuilder(scriptParts, "x")
  })
})

// Selecting places

const selectSourceBtn = document.getElementById('source-directory')
const selectDestBtn = document.getElementById('destination-directory')

selectSourceBtn.addEventListener("click", (event) => {
  selectedSource = dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  document.getElementById('selected-source').innerHTML = `Source: ${selectedSource}`
  scriptParts.source = selectedSource
  scriptBuilder(scriptParts)
})

selectDestBtn.addEventListener("click", (event) => {
  selectedDest = dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  document.getElementById('selected-dest').innerHTML = `Destination: ${selectedDest}`
  scriptParts.dest = selectedDest
  scriptBuilder(scriptParts)
})