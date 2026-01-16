
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./DbConnect');
const cors = require('cors');
const router = express.Router();



const app = express();
app.get('/', (req, res) => {
  res.send('Server radi na localhost:3000');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Server je na portu 3000');
})

app.use(express.json());
app.use(cors());
app.use('/user',router);

router.post('/register',async(req,res)=>{
    const {Username,Email,Password} = req.body;
    if(!Username||!Email||!Password){
        return res.status(400).json({message: 'All fields are required'});
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const HashPassword = await bcrypt.hash(Password,salt);
        const query = 'insert into users(Username, Password, Email) values(?,?,?)';
        db.query(query,[Username,HashPassword,Email], (err,results)=>{
            if(err) throw err;
            res.status(201).json({
                message: 'User has been added to the database'
            });
        });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({
            message: 'Error while registering user'
        });
        
    }
});

router.post('/login',async(req,res)=>{
    const {Username,Password} = req.body;
    const query = 'select * from users where Username = ?';
    db.query(query,[Username],async(err,results)=>{
        if(err) throw err;
        if(results.length>0){
            const user = results[0];
            const IsRight = await bcrypt.compare(Password, user.Password);
            if(IsRight){
                res.status(200).json({
                    message: 'User has logged in',
                    token: user.Username
                });

            }
            else{
                res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
        }
        else{
            res.status(404).json({
                    message: 'User not found'
                });
        }
    });
});
module.exports = router;
