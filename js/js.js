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

const buttons = document.querySelectorAll('#options button')
buttons.forEach(function (b, i){
  b.addEventListener("click", (e) => {
    console.log("click")
    if (!scriptParts.flags) { scriptParts.flags += "-" }
    if (!b.value) {
      scriptParts.flags += b.id
      b.value = "checked"
    } else if (b.value = "checked") {
      scriptParts.flags = scriptParts.flags.replace(b.id,'')
      b.value = ""
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
  document.getElementById('selected-source').innerHTML = `Selected path: ${selectedSource}`
  scriptParts.source = selectedSource
  scriptBuilder(scriptParts)
})

selectDestBtn.addEventListener("click", (event) => {
  selectedDest = dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  document.getElementById('selected-dest').innerHTML = `Selected path: ${selectedDest}`
  scriptParts.dest = selectedDest
  scriptBuilder(scriptParts)
})