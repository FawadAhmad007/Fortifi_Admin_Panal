// utils/alert.ts
import Swal from "sweetalert2"

export const showAlert = (title: string, text: string, icon: "success" | "error" | "warning" | "info" | "question") => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#A700B9", // Fortifi purple
  })
}
export const showSuccess = (message: string) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      confirmButtonColor: "#A700B9",
    })
  }
  
  export const showError = (message: string) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      confirmButtonColor: "#A700B9",
    })
  }
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end", //position: "top-start" | "top-end" | "bottom-end" | "bottom-start"
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#1f1f1f",
    color: "#fff",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer)
      toast.addEventListener("mouseleave", Swal.resumeTimer)
    },
  })
  
export const showToast = (icon: "success" | "error" | "info", message: string) => {
    Toast.fire({
      icon,
      title: message,
    })
  }
export const showToastSuccess = (msg: string) => showToast("success", msg)
export const showToastError = (msg: string) => showToast("error", msg)
export const showAlertThenToast = () => {
    Swal.fire({
      title: "Congratulations!",
      text: "You've joined the beta version. You'll receive updates via email.",
      icon: "success",
      confirmButtonColor: "#A700B9",
    }).then((result) => {
      if (result.isConfirmed) {
        // Now show the toast
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "success",
          title: "Request has been sent.",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#1f1f1f",
          color: "#fff",
        })
      }
    })
  }