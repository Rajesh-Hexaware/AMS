import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }
  deleteBtn():Promise<any> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'me-2 btn btn-danger'
      },
      buttonsStyling: false
    })
    
   let data = swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      showLoaderOnConfirm: true   
    }).then((result:any) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        return result.isConfirmed
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
        return result.dismiss
      }
    })
    return data
  }
  successBtn() {
    Swal.fire({
      title: 'Successful',
      text: "Your data has been stored.",
      icon: 'success',      
       
    })
  }
  
  errorBtn(){  
    Swal.fire({
      title: 'Oops...',
      text: "Something went wrong!!",
      icon: 'error',     
       
    })
  }

  signinerrorBtn(message:string) {
    Swal.fire({
      title: 'Oops...',
      text: message,
      icon: 'error',    
       
    })
  }
}
