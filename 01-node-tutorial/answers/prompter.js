import { createServer } from 'http';
import { StringDecoder } from 'string_decoder';

const getBody = (req, callback) => {
  const decode = new StringDecoder('utf-8');
  let body = '';
  req.on('data', function (data) {
    body += decode.write(data);
  });
  req.on('end', function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split('&');
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split('=');
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
const message = 'Guess a number between 1 and 100.';

let attempts = 0;
let targetNumber = Math.floor(Math.random() * 100) + 1;

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = (feedback = '') => {
  return `
  <style>
  body {
    display: flex;
    height: 100vh;
    text-align: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #f4f4f9;
    font-family: Arial, sans-serif;
  }
  .header-text {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }
  form {
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  input[type="number"], button {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    font-size: 16px;
    box-sizing: border-box;
  }
  button {
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    background-color: #4caf50;
  }
  button:hover {
    background-color: #45a049;
  }
  .feedback {
    color: #333;
    font-size: 18px;
    margin-top: 20px;
  }
  </style>
  <body>
  <div class="header-text">${message}</div>
  <form method="POST">
  <input type="number" name="guess" min="1" max="100" required>
  <button type="submit">Guess</button>
  </form>
  <div class="feedback">${feedback}</div>
  </body>
  `;
};

const server = createServer((req, res) => {
  console.log('req.method is ', req.method);
  console.log('req.url is ', req.url);
  if (req.method === 'POST') {
    getBody(req, (body) => {
      console.log('The body of the post is ', body);

      // here, you can add your own logic
      const guess = parseInt(body['guess']);
      let feedback = '';
      attempts++;

      if (guess === targetNumber) {
        feedback = `Congratulations! You guessed the number in ${attempts} attempts!`;
        attempts = 0;
        targetNumber = Math.floor(Math.random() * 100) + 1;
      } else if (guess < targetNumber) {
        feedback = 'Your guess is too low. Try again.';
      } else {
        feedback = 'Your guess is too high. Try again.';
      }
      // Your code changes would end here

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(form(feedback));
    });
  } else {
    res.end(form());
  }
});

server.on('request', (req) => {
  console.log('event received: ', req.method, req.url);
});

server.listen(3000);
console.log('The server is listening on port 3000.');
