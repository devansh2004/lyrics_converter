document.addEventListener('DOMContentLoaded', function() {
  /*
  This is called after the browser
  has loaded the web page
  */

  //add listeners to buttons
  document.getElementById('submit_button').addEventListener('click', handleSubmitButton)

  //butons to change the key of the song
  document.getElementById('tanspose_up_button').addEventListener('click', handleTransposeUpButton)
  document.getElementById('tanspose_down_button').addEventListener('click', handleTransposeDownButton)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
})
