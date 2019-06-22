const { dialog } = require('electron').remote

const selectSourceBtn = document.getElementById('source-directory')
const selectDestBtn = document.getElementById('destination-directory')

selectSourceBtn.addEventListener("click", (event) => {
  selectedSource = dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  document.getElementById('selected-source').innerHTML = `Source: ${selectedSource}`
})

selectDestBtn.addEventListener("click", (event) => {
  selectedDest = dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  document.getElementById('selected-dest').innerHTML = `Destination: ${selectedDest}`
})