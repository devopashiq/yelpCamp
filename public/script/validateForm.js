 // Example starter JavaScript for disabling form submissions if there are invalid fields
 (() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();

  // document.addEventListener("DOMContentLoaded", function () {
  //   const alerts = document.querySelectorAll(".alert");
  
  //   alerts.forEach((alert) => {
  //     setTimeout(() => {
  //       alert.classList.remove("show"); // Hide alert visually
  //       alert.classList.add("fade"); // Add fade effect
  //       setTimeout(() => alert.remove(), 500); // Remove from DOM after fade-out
  //     }, 3000); // 3-second delay before dismissing
  //   });
  // });

