/*
These functions handle parsing the chord-pro text format
*/

function parseChordProFormat(chordProLinesArray) {

  //parse the song lines with embedded
  //chord pro chords and add them to DOM

  console.log('type of input: ' + typeof chordProLinesArray)

  //add the lines of text to html <p> elements
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = '' //clear the html


  chordProLinesArray = convertToChordPro(chordProLinesArray)
  console.log(chordProLinesArray)

  for (let i = 0; i < chordProLinesArray.length; i += 2) {
    
        //check if we are on the original key
        if(original % 12 == 0){
          textDiv.innerHTML = textDiv.innerHTML + `<pre><span class="chordGreen">${chordProLinesArray[i]}</span> <br> <span class="blue">${chordProLinesArray[i+1]}</span></pre>`
        }
        else{
          textDiv.innerHTML = textDiv.innerHTML + `<pre><span class="chordRed">${chordProLinesArray[i]}</span> <br> <span class="blue">${chordProLinesArray[i+1]}</span></pre>`
        }
        
      }

    
  }
