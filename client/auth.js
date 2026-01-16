const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const Username = document.getElementById('Username').value.trim();
    const Email = document.getElementById('Email').value.trim();
    const Password = document.getElementById('Password').value;
    const RepeatPassword = document.getElementById('Repeat-Password').value;

    
    const fields = { Username, Email, Password };
    for (let key in fields) {
        if (fields[key].length > 32) {
            alert(`${key} ne sme biti duži od 32 karaktera!`);
            return;
        }
        if (fields[key].length === 0) {
            alert(`Sva polja su obavezna!`);
            return;
        }
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
        alert('Email adresa nije u ispravnom formatu (npr. tekst@tekst.com)!');
        return;
    }

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(Password)) {
        alert('Lozinka mora imati bar 8 karaktera, jedno veliko slovo, jedno malo slovo i jedan broj!');
        return;
    }

    
    if (Password !== RepeatPassword) {
        alert('Lozinke se ne podudaraju!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email,
                Username,
                Password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registracija uspešna!');
            window.location.href = 'DecisionModal.html';
        } else {
            
            alert(data.message || data); 
        }
    } catch (error) {
        console.error(error);
        alert('Greška pri povezivanju sa serverom.');
    }
});