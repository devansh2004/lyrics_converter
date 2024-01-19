//KEY CODES
//should clean up these hard coded key codes
const ENTER = 13
const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40
let original = 0


function handleKeyDown(e) {

  //console.log("keydown code = " + e.which );
  let keyCode = e.which
  if (keyCode == UP_ARROW | keyCode == DOWN_ARROW) {
    //prevent browser from using these with text input drop downs
    e.stopPropagation()
    e.preventDefault()
  }

}

function handleKeyUp(e) {
  //console.log("key UP: " + e.which);
  if (e.which == RIGHT_ARROW | e.which == LEFT_ARROW | e.which == UP_ARROW | e.which == DOWN_ARROW) {
    //do nothing for now
  }

  if (e.which == ENTER) {
    handleSubmitButton() //treat ENTER key like you would a submit

    document.getElementById('userTextField').value = ''
  }

  e.stopPropagation()
  e.preventDefault()

}

function handleSubmitButton() {
  //USES older-style XMLHttpRequest which we will replacde later with fetch()
  //get text from user text input field
  console.log("run")
  let userText = document.getElementById('userTextField').value

  //clear lines of text in textDiv
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = ''
  //clear the user text field
  document.getElementById('userTextField').value = ''

  if (userText && userText !== '') {
    let userRequestObj = {
      text: userText
    }
    let userRequestJSON = JSON.stringify(userRequestObj)
    

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       console.log("typeof: " + typeof this.responseText)
       console.log("data: " + this.responseText)
       //we are expecting the response text to be a JSON string
       let responseObj = JSON.parse(this.responseText)

        words = [] //clear drag-able words array;
        if (responseObj.songLines) {
          song.songLines = responseObj.songLines
          original = 0
          parseChordProFormat(song.songLines.slice())
        }

      }
    }
    xhttp.open("POST", "song") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)

  }
} 



function handleTransposeUpButton() {
  //transpose the lyrics up
  transpose(1)

}
function handleTransposeDownButton() {
  //transpose the lyrics down
  transpose(-1)
}

function transpose(shift){

  //keeps track of the shifts to know when we are in the origianl key
  original += shift

  //arrays to hold all the types of keys
  let sharp = ['A',	'A#',	'B',	'C',	'C#',	'D',	'D#',	'E',	'F',	'F#',	'G',	'G#']
  let flat = ['A',	'Bb',	'B',	'C',	'Db',	'D',	'Eb',	'E',	'F', 'Gb',	'G',	'Ab']

  //loops to go through each character in the song array
  for(let i = 0; i < song.songLines.length; i++){
    for(let x = 0; x < song.songLines[i].length; x++){
      //var to hold the transposed chord
      let newChord = ""

      //checks for when we find a chord
      if(song.songLines[i][x] == "["){

        

        //check if there is a sharp
        if(song.songLines[i][x+2] == "#" && sharp.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2]) != -1){
          if((sharp.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2])+shift) % 12 ){

          }
          console.log((sharp.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2])+shift) % 12)

          //find and store the transposed chord
          newChord = sharp[(sharp.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2])+shift) % 12]

          //replace the old chord with the new one
          song.songLines[i] = song.songLines[i].substring(0, x+1) + newChord + song.songLines[i].substring(x + 3);
          
        }

        //check if there is a flat
        else if(song.songLines[i][x+2] == "b" && flat.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2]) != -1){
          console.log((flat.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2])+shift) % 12)

          //find and store the transposed chord
          newChord = flat[(flat.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2])+shift) % 12]

          //replace the old chord with the new one
          song.songLines[i] = song.songLines[i].substring(0, x+1) + newChord + song.songLines[i].substring(x + 3);
        }

        //if there is no sharp or flat
        else if(sharp.indexOf(song.songLines[i][x+1]) != -1){

          //check for if the transpose overflows into a negative number
          if((sharp.indexOf(song.songLines[i][x+1])+shift) == -1){
            newChord = sharp[11]
            song.songLines[i] = song.songLines[i].substring(0, x+1) + newChord + song.songLines[i].substring(x + 2);
            continue;
          }

          //find and store the transposed chord
          newChord = sharp[(sharp.indexOf(song.songLines[i][x+1])+shift) % 12]

          //replace the old chord with the new one
          song.songLines[i] = song.songLines[i].substring(0, x+1) + newChord + song.songLines[i].substring(x + 2);
        }
        }

        //check for if there is a slash and transpose the chord next to it
        if(song.songLines[i][x] == "/"){


          //check if there is a sharp
          if(song.songLines[i][x+2] == "#" && sharp.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2]) != -1){

            //find and store the transposed chord
            newChord = sharp[(sharp.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2])+shift) % 12]

            //replace the old chord with the new one
            song.songLines[i] = song.songLines[i].substring(0, x+1) + newChord + song.songLines[i].substring(x + 3);
            
          }

          //check if there is a flat
          else if(song.songLines[i][x+2] == "b" && flat.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2]) != -1){

            //find and store the transposed chord
            newChord = flat[(flat.indexOf(song.songLines[i][x+1]+song.songLines[i][x+2])+shift) % 12]

            //replace the old chord with the new one
            song.songLines[i] = song.songLines[i].substring(0, x+1) + newChord + song.songLines[i].substring(x + 3);
          }

          //if there is no sharp or flat
          else if(sharp.indexOf(song.songLines[i][x+1]) != -1){

            //check for if the transpose overflows into a negative number
            if((sharp.indexOf(song.songLines[i][x+1])+shift) == -1){
              newChord = sharp[11]
              song.songLines[i] = song.songLines[i].substring(0, x+1) + newChord + song.songLines[i].substring(x + 2);
              continue;
            }

            //find and store the transposed chord
            newChord = sharp[(sharp.indexOf(song.songLines[i][x+1])+shift) % 12]

            //replace the old chord with the new one
            song.songLines[i] = song.songLines[i].substring(0, x+1) + newChord + song.songLines[i].substring(x + 2);
          }
          }
      }
    }

    //send the new array to be displayed on the website
    parseChordProFormat(song.songLines.slice())
  }
  

