const cors = require("cors")
const dotenv = require("dotenv")
const express = require("express")
const fs = require("fs")
const path = require('path');
const expressFileupload = require("express-fileupload")

if (process.env.NODE_ENV != "production") {
  dotenv.config()
}

const data = [];
const txtFiles = fs.readdirSync('./txt_library');

const app = express();
const port = 3001; // You can use any port you prefer

app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(expressFileupload()) // Add this middleware to enable file uploads

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let file = req.files.file;
  let uploadPath = './txt_library/' + file.name;

  fs.writeFileSync(uploadPath, file.data);
  res.send(`File uploaded successfully to ${uploadPath}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

txtFiles.forEach((file) => {
  const filePath = path.join('./txt_library', file);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const questions = [];
  const lines = fileContent.split('\n');
  lines.forEach((line) => {
    if (line.startsWith('/q')) {
      const question = line.substring(3).trim();
      const answers = [];
      let correctAnswer;
      let queType;

      for (let i = 1; i < lines.length; i++) {
        const nextLine = lines[i];
        if (nextLine.startsWith('/ra')) {
          correctAnswer = nextLine.substring(4).trim();
          queType = 'Choice';
        } else if (nextLine.startsWith('/a')) {
          answers.push(nextLine.substring(3).trim());
        } else {
          break;
        }
      }

      questions.push({
        _id: `${file}_${question}`,
        question,
        que_type: queType,
        right_answer: [correctAnswer],
        answer: [correctAnswer, ...answers],
      });
    }
  });

  data.push({
    name: file.replace('.txt', ''),
    desc: '',
    questions,
  });
});

fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));