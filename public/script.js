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

async function showDialogConfirm(title, message, type) {

    swal({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        } else if (result.isDenied) {
          return false;
        }
      })



}