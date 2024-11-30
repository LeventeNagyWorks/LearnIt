const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const path = require('path');
const expressFileupload = require("express-fileupload");
const txtToJSON = require("./txtToJSON");
const mongoose = require('mongoose');
const MUser = require('./models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 3001;
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(expressFileupload());

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose.set("strictQuery", true);
mongoose.connect(CONNECTION_STRING)
    .then(() => console.log("Connected to the database"))
    .catch(e => {
        console.error("Failed to connect to the database");
        console.log("Error:");
        console.log(e);
    });

if (!fs.existsSync('./data.json')) {
  fs.writeFileSync('./data.json', '[]');
}

app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  const uploadedFiles = Array.isArray(req.files.file) ? req.files.file : [req.files.file];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    for (const file of uploadedFiles) {
      const fileContent = Buffer.from(file.data).toString('utf8');
      const cleanFileName = Buffer.from(file.name, 'binary').toString('utf8').replace(/\.txt$/i, '');
      
      const parsedData = txtToJSON({ 
        name: cleanFileName, 
        content: Buffer.from(fileContent, 'utf8')
      });
     
      await MUser.findByIdAndUpdate(userId, {
        $push: {
          studySets: {
            name: cleanFileName,
            questions: parsedData.questions,
            isFavorite: false
          }
        }
      });
    }

    res.send('Files uploaded successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing upload');
  }
});

app.get('/data', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await MUser.findById(decoded.userId);
    res.json(user.studySets || []);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch study sets' });
  }
});

app.get('/api/data/:itemName/questions', async (req, res) => {
    const { itemName } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await MUser.findById(decoded.userId);
        const studySet = user.studySets.find(set => set.name === itemName);
        
        if (studySet) {
            res.json({ questions: studySet.questions });
        } else {
            res.json({ questions: [] });
        }
    } catch (err) {
        console.error('Error fetching question states:', err);
        res.status(500).json({ error: 'Failed to fetch question states' });
    }
});

app.post('/api/updateQuestionStates', async (req, res) => {
  const { itemName, questionStates } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, SECRET_KEY);  

  if (!token) {
      return res.status(401).send('Unauthorized');
  }

  try {
      const decoded = jwt.verify(token, SECRET_KEY);
      
      for (const state of questionStates) {
          await MUser.updateOne(
              {
                  _id: decoded.userId,
                  'studySets.name': itemName,
                  'studySets.questions.question': state.question
              },
              {
                  $set: {
                      'studySets.$[set].questions.$[que].learningState': state.state
                  }
              },
              {
                  arrayFilters: [
                      { 'set.name': itemName },
                      { 'que.question': state.question }
                  ]
              }
          );
      }
      
      res.json({ success: true });
  } catch (err) {
      console.error('Error updating question states:', err);
      res.status(500).json({ error: 'Failed to update question states' });
  }
});

app.delete('/delete/:itemName', async (req, res) => {
  const { itemName } = req.params;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    await MUser.findByIdAndUpdate(decoded.userId, {
      $pull: {
        studySets: { name: itemName }
      }
    });
    res.send(`Study set "${itemName}" deleted successfully!`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete study set' });
  }
});

app.post('/updateFavorite', async (req, res) => {
  const { itemName, isFavorite } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    await MUser.findOneAndUpdate(
      { 
        _id: decoded.userId,
        'studySets.name': itemName 
      },
      {
        $set: { 'studySets.$.isFavorite': isFavorite }
      }
    );
    res.send('Favorite status updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update favorite status' });
  }
});

app.post('/registration', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await MUser.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new MUser({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await MUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: rememberMe ? '30d' : '1h' }
    );

    res.json({
      message: 'Login successful',
      userId: user._id,
      username: user.username,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

app.get('*', (req, res) => {
  console.log('Serving index.html for path:', req.path);
  res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send(err);
    }
  });
});
