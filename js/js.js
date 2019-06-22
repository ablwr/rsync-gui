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
  builtScript = `${scriptParts.rsync} ${scriptParts.flags} ${scriptParts.source} ${scriptParts.dest}` 
  document.getElementById('showScript').innerHTML = builtScript
}

const buttons = document.querySelectorAll('input')
buttons.forEach(function (b, i){
  b.addEventListener("change", (e) => {
    if (!scriptParts.flags) { scriptParts.flags += "-" }
    if (b.checked) {
      scriptParts.flags += b.id
    } else {
      scriptParts.flags = scriptParts.flags.replace(b.id,'')
    }
    if (scriptParts.flags == "-") { scriptParts.flags = "" }
    scriptBuilder(scriptParts)
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