const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;
const fs = require('fs');
const petsFile = path.join(__dirname, 'data/pets.txt');
app.use(express.urlencoded({ extended: true }));
app.post('/find', (req, res) => {
    const criteria = req.body;

    const allPets = fs.readFileSync(petsFile, 'utf-8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && line.includes(':'));

    const results = allPets.length === 0 ? [] :
        allPets.map(line => {
            const [id, user, type, breed, age, gender, compatRaw, comment, petName, ownerName, email] = line.split(':');
            console.log(user);
            return {
                id,
                username: user,
                type,
                breed,
                age: parseFloat(age),
                gender,
                compatibility: compatRaw.split(','),
                comment,
                petName,
                ownerName,
                email
            };

        })
        .filter(pet => {
            // Match filters from form
            if (criteria.animal_type && pet.type !== criteria.animal_type) return false;
            if (criteria.breed && criteria.breed !== 'any' && pet.breed !== criteria.breed) return false;
            if (criteria.age && criteria.age !== 'any') {
                const ageNum = pet.age;
                const ranges = {
                    'puppy_kitten': [0, 1],
                    'young': [1, 3],
                    'adult': [3, 7],
                    'senior': [7, 100]
                };
                const [min, max] = ranges[criteria.age];
                if (ageNum < min || ageNum >= max) return false;
            }
            if (criteria.gender && criteria.gender !== 'any' && pet.gender !== criteria.gender) return false;

            // Check compatibility (all checkboxes optional)
            const compatList = criteria.compatibility || []; // checkbox values
            return compatList.every(val => pet.compatibility.includes(val));
        });

    res.render('find', { results });
});

// Middleware

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'adoptapet',
    resave: false,
    saveUninitialized: true
}));

// Set EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.listen(PORT, () => {
    console.log(`✅ Server is running!`);
    console.log(`Visit our Website! -> http://localhost:${PORT}`);
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/', (req, res) => {
    res.render('index', { active: 'home' });
});

app.get('/find', (req, res) => {
    res.render('find', { active: 'find' });
});

app.get('/dog-care', (req, res) => {
    res.render('dog-care', { active: 'dog-care' });
});

app.get('/cat-care', (req, res) => {
    res.render('cat-care', { active: 'cat-care' });
});

app.get('/give-away', (req, res) => {
    res.render('give-away', { active: 'give-away' });
});

app.get('/contact-us', (req, res) => {
    res.render('contact-us', { active: 'contact-us' });
});
