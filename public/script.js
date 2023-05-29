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
