const form = document.getElementById('register-form');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const Username = document.getElementById('Username').value;
    const Email = document.getElementById('Email').value;
    const Password = document.getElementById('Password').value;
    const RepeatPassword = document.getElementById('Repeat-Password').value;

    if(Password!== RepeatPassword){
        alert('Passwords dont match!');
        return;
    }
    
    try{
        const response = await fetch('http://localhost:3000/user/register',{
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

        if(response.ok){
            alert('Registration done!');
            window.location.href='DecisionModal.html';
        }
        else{
            alert(data);
        }
    }
    catch(error){
        console.error(error);
        alert('Server error');
    }
})
