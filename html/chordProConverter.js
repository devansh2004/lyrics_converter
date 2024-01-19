
/*
Example of ASYNCHRONOUS file read.
Function readFile does not block (wait) for the file to be read.

Instead its argument function(err,data) will be called once the file has been read.
function(err,data) is the "call back" function that will be called when readFile's task is done.

Notice "DONE" gets written to the console before the file contents. Make
sure you understand why that is.
*/



function convertToChordPro(chordProLinesArray) {
  let array = chordProLinesArray;

  //holds the chords
  let chords = [];

  




  //fill the chord array with empty lines
  for(let line of array){ chords.push("")}

  //loop throgh the array for each line
  for(let i = 0; i < array.length; i++){
    let flag = false;
    let skip = 0;
    let c = "";

    //loop through the array for each char
    for(let x = 0; x < array[i].length; x++){
      
      //check of opening braket and set flag to true to say we are looking at a chord
      if(array[i][x] == "["){
        flag = true;
      }
      

      //add the chord to the chords array when flag is true
      if(flag){
          if(i > 0 && skip != 0){
            c += array[i][x];
            skip -=1;
          }
          else{
            chords[i] += " ";
            c += array[i][x];
          }
        
      }
      else{
        if(i > 0){
          if(skip != 0){
            skip -=1;
            continue;
          }
        }
        //console.log(x);
        chords[i] += " ";
      }

      //check for closing braket
      if(array[i][x] == "]"){

        //reset all varibles
        flag = false;
      
        chords[i] += c;
        skip = c.length;
        c = "";
      }
    }
  }

  



  



  //loop through the array
  for(let i = 0; i < array.length; i++){
    let flag = false;
    let x = 0;
    while(x < array[i].length){

      
      //look for opening braket and set flag to true to say we are looking at a chord
      if(array[i][x] == "["){
        flag = true;
      }

      //check if we are at a chord and remove it
      if(flag){

        //check for closing bracket and set flag to false to say we are not looking at chords now
        if(array[i][x] == "]"){
          flag = false;
        }

        // delete the chords
        array[i] = array[i].substring(0, x) + "" + array[i].substring(x + 1);
        let b = x;
        while(b<chords[i].length){
          
          if(chords[i][b] == " "){
            chords[i] = chords[i].substring(0, b) + "" + chords[i].substring(b + 1);
            break;
          }
          if(chords[i][b] == "["){
            chords[i] = chords[i].substring(0, b) + "" + chords[i].substring(b + 1);
            break;
          }
          b += 1;
        }
        continue;
        
      }

      
      x += 1;
      
    }
    }
    
    //remove all brakets from chords
    for(let i = 0; i < chords.length; i++){
      chords[i] = chords[i].replace("[", "");
      chords[i] = chords[i].replaceAll("[", " ");
      chords[i] = chords[i].replaceAll("]", " ");
    }
    
   
    
  //loop to check the output
  //for(let i = 0; i < array.length; i++){

    //console.log(chords[i]);
   // console.log(array[i]);
 // }


  //create a return array var
  let lyrics = []

  //combine the lytrics and chords into one array
  for(let i = 0; i < array.length; i++){

    lyrics.push(chords[i]);
    lyrics.push(array[i]);
  }

  //return the lyrics in chords pro format
  return lyrics;
  }

console.log("DONE")
