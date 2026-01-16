const form = document.getElementById('login-form');

if (form){
    form.addEventListener('submit', async (e) =>{
        e.preventDefault();
        
        const Username = document.getElementById('Username').value;
        const Password = document.getElementById('Password').value;

        try{
            const response = await fetch('http://localhost:3000/user/login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Username,
                    Password
                })
            });
            const data = await response.json();

            if(response.ok){
                localStorage.setItem('token',data.token);
                console.log(data);
                window.location.href="index.html"
            }
            else{
                alert(data.message);
            }
        }
        catch(error){
            console.error(error);
            alert('Server error');
        }
    });
}