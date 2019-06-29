const { dialog, clipboard } = require('electron').remote
const { spawn } = require('child_process')

// Action buttons

function executeScript(command, callback) {
  const script = spawn("rsync", command)
  document.getElementById("resultsPrompt").innerText = ""
  script.stdout.on('data', (data) => {
    document.getElementById("running").innerText = data
    document.getElementById("resultsPrompt").append("Great! Is this what you expected?")
    document.getElementById("actions").classList.remove("hidden")
  });

  script.stderr.on('data', (data) => {
    document.getElementById("running").innerText = data
    document.getElementById("resultsPrompt").innerText = ""
    document.getElementById("resultsPrompt").append("There was an error with this command.")
  });

  script.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
z
document.getElementById("test").addEventListener("click", (e) => {
  script = document.getElementById('showScript').innerText + ", --dry-run"
  script = script.replace("rsync ", "").split(" ")
  executeScript(script, (output) => {
    //
  });
})

document.getElementById("run").addEventListener("click", (e) => {
  script = document.getElementById('showScript').innerText
  console.log("Running " + script)
  script = script.replace("rsync ", "").split(" ")
  executeScript(script, (output) => { });
})

document.getElementById("restart").addEventListener("click", (e) => {
  location.reload()
})

// Kill process while running
document.getElementById("stop").addEventListener("click", (e)=> {
  console.log("Killing...")
  // kill(runTest)
})

// Remote addition
document.getElementById("remote").addEventListener("click", (e) => {
  document.getElementById("remoteFields").classList.remove("hidden")
  scriptBuilder()
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
      b.style = ""
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

// Clipboard

document.getElementById("copyScript").addEventListener("click", (e) => {
  showScript = document.getElementById("showScript").innerText
  clipboard.writeText(showScript)
})
