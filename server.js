const express = require('express');
const app = express()
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')


const PORT = process.env.PORT || 4000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/users/register', (req, res) => {
    res.render("register")
});

app.get('/users/login', (req, res) => {
    res.render("login")
});

app.get('/users/dashboard', (req, res) => {
    res.render("dashboard", { user: "Lilth" });
});

app.post('/users/register', async (req, res, next) => {
    let { name, email, password, password2 } = req.body;
    console.log({ name, email, password, password2 })
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ message: "please enter all fields..." });
    }
    if (password.length < 6) {
        errors.push({ message: "Password should be atleast 6 characters long" });
    }
    if (password != password2) {
        errors.push({ message: "Password do not match" })
    }
    if (errors.length > 0) {
        res.render("register", { errors })
    }
    else {
        // form validation passed
        let hashedPass = await bcrypt.hash(password, 3);
        console.log(hashedPass)

        pool.query(
            `SELECT * FROM users
            WHERE email = $1`, [email],
            (err, results) => {
                if (err) {
                    console.error(err.stack)
                    throw err
                }
                console.log(results.rows)

                if (results.rows.length > 0) {
                    errors.push({ message: "Email already taken" })
                    res.render('register', { errors })
                }
                else{
                    pool.query(
                        `INSERT INTO users (name,email,password)
                        VALUES ($1,$2,$3)
                        RETURNING id,password`,[name,email,hashedPass],
                        (err,results)=>{
                            if(err){
                                console.log(err.stack)
                                throw err
                            }
                            console.log(results.rows);
                            req.flash("success_msg","You my sir/ma'am are registered now. Please log in")
                            res.redirect('/users/login')
                        }
                    )
                }
            }
        );
    }
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});