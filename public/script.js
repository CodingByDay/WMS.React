function showAlert(title, message, type) {

    swal(title, message, type);
}

function toggleLoaader (id, close)
{
  var loader = document.getElementById(id);
  if(!close) {
    loader.style.display = "block"; 
  } else {
    loader.style.display = "block"; 
  }
} 
$(document).ready(function() {
  // Attach a click event handler to the element with the ID 'back-button'
  $('#back-button').click(function() {
    var backValue = localStorage.getItem('back');
        
    if (backValue) {
     
      // Redirect to the stored URL
      window.location.href = backValue;
    } else {
      return;
    }
  });
});