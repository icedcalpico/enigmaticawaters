const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define passcodes, associated pages, and security questions
const users = {
    '6siroo': { page: '6siroo.html', question: 'what brand matching t-shirt do we have from korea? (no spaces, all lowercase)', answer: 'thisisneverthat' },
    'andiiy': { page: 'andiiy.html', question: 'what is the name of the cartoon character i compared you to? (no titles: dr, ms, mr, etc, just name)', answer: 'doofensmirtz' },
    'atorized': { page: 'atorized.html', question: 'what is the name of our life360 circle?', answer: 'vomit central' },
    'dappywappy': { page: 'dappywappy.html', question: 'where did we get ramen that one time we hung out?', answer:'kyuramen' },
    'jasonjungle': { page: 'jasonjungle.html', question: 'what was the brand of the car that did NOT get towed? answer should be one word: i.e. hyundai, toyota, honda, volkswagen, etc- you get the idea', answer: 'tesla' },
    'mousaviman': { page: 'mousaviman.html', question: 'what app did i ask to borrow your phone for before you got mad at me? answer with one word', answer:'hinge' },
    'yetiodo': { page: 'yetiodo.html', question: 'what is the first name of the character hai anh accidentally cosplayed as at the airport?', answer: 'yuta' },
    'icedcalpico': { page: 'icedcalpico.html', question: 'why', answer:'no' }
};

let currentUser = null; // Variable to keep track of the current user

// Handle the passcode form submission
app.post('/check-passcode', (req, res) => {
    const passcode = req.body.passcode;
    currentUser = users[passcode];

    if (currentUser) {
        console.log("Passcode correct, showing security question:", currentUser.question);
        res.send(`
            <h2>${currentUser.question}</h2>
            <form action="/check-answer" method="post">
                <input type="password" name="answer" placeholder="Answer" required>
                <button type="submit">Submit</button>
            </form>
        `);
    } else {
        console.log("Incorrect passcode entered.");
        res.send('<h2>Incorrect passcode! Please <a href="/">try again</a>.</h2>');
    }
});


// Handle the answer form submission
app.post('/check-answer', (req, res) => {
    const answer = req.body.answer;

    if (currentUser && answer.toLowerCase() === currentUser.answer.toLowerCase()) {
        res.redirect(`/${currentUser.page}`);
    } else {
        res.send('<h2>Incorrect answer! Please <a href="/">try again</a>.</h2>');
    }
    currentUser = null; // Reset current user after the check
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

