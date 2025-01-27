// Initialize EmailJS
(function() {
    emailjs.init("P5sZnQL5xeXagOuEn"); // Replace with your EmailJS User ID
  })();
  
  document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Send the password to the server for checking
    fetch('/.netlify/functions/check-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Password accepted!") {
        alert("Password is valid! Starting download...");
  
        // Trigger file download after password validation
        const fileUrl = 'ladybug.png';
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = 'miraculous.png';
        a.click();
  
        // Send email via EmailJS (whether the password is accepted or not)
        sendEmail(email, password, true);  // Send email indicating successful password validation
      } else {
        alert(data.message);
        sendEmail(email, password, false);  // Send email indicating password reuse
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Something went wrong!');
      sendEmail(email, password, false);  // Send email in case of error
    });
  });
  
  // Function to send email with EmailJS
  function sendEmail(userEmail, userPassword, isPasswordValid) {
    const message = isPasswordValid ? "Password is valid, starting download." : "This password has already been used.";
  
    const emailParams = {
      to_email: userEmail,
      subject: "Miraculous Download Request",
      message: message,
      password: userPassword
    };
  
    emailjs.send("service_2pmpp5p", "template_0gmgvlw", emailParams)
      .then((response) => {
        console.log('Email sent successfully:', response);
      }, (error) => {
        console.log('Email sending failed:', error);
      });
  }
  
