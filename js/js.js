const { dialog } = require('electron').remote
const { exec } = require('child_process');

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
};

document.getElementById("run").addEventListener("click", (e) => {
  // dryrun until I feel good about the stop button working
  script = document.getElementById('showScript').innerText
  console.log(script)
  execute(script, (output) => {
    console.log(output);
  });
})


// scriptBuilder

let scriptParts = {
  rsync: "rsync",
  flags: "",
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
    if (!scriptParts.flags) { scriptParts.flags += "-" }
    if (!b.value) {
      scriptParts.flags += b.id
      b.value = "checked"
      b.style = "background-color: #a0d01a;"
    } else if (b.value = "checked") {
      scriptParts.flags = scriptParts.flags.replace(b.id,'')
      b.value = ""
      b.style = "background-color: #d9a902;"
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
  selectedSource += "/"
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