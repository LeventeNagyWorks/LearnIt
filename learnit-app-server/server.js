const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const path = require('path');
const expressFileupload = require("express-fileupload");
const txtToJSON = require("./txtToJSON");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(expressFileupload());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Ensure data.json exists
if (!fs.existsSync('./data.json')) {
  fs.writeFileSync('./data.json', '[]');
}

// API Routes
app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFiles = Array.isArray(req.files.file) ? req.files.file : [req.files.file];

  try {
    for (const file of uploadedFiles) {
      const fileContent = file.data.toString('utf8');
      const parsedData = txtToJSON({ name: file.name, content: fileContent });
      
      const existingData = await fs.promises.readFile('./data.json', 'utf8');
      const newData = JSON.parse(existingData);
      newData.push(parsedData);

      await fs.promises.writeFile('./data.json', JSON.stringify(newData, null, 2));
    }

    res.send(`Files uploaded successfully!`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing upload');
  }
});

app.get('/data', async (req, res) => {
  console.log('Data endpoint hit');
  try {
    const data = await fs.promises.readFile('./data.json', 'utf8');
    console.log('Data read successfully:', data);
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading data:', err);
    res.status(500).json({ error: 'Failed to read data.json' });
  }
});

app.delete('/delete/:itemName', async (req, res) => {
  const { itemName } = req.params;
  try {
    const data = await fs.promises.readFile('./data.json', 'utf8');
    const newData = JSON.parse(data).filter((item) => item.name !== itemName);
    await fs.promises.writeFile('./data.json', JSON.stringify(newData, null, 2));
    res.send(`Study set "${itemName}" deleted successfully!`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete study set' });
  }
});

app.post('/updateFavorite', async (req, res) => {
  const { itemName, isFavorite } = req.body;
  try {
    const data = await fs.promises.readFile('./data.json', 'utf8');
    let jsonData = JSON.parse(data);
    const itemIndex = jsonData.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
      jsonData[itemIndex].isFavorite = isFavorite;
      await fs.promises.writeFile('./data.json', JSON.stringify(jsonData, null, 2));
      res.send('Favorite status updated successfully');
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update favorite status' });
  }
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  console.log('Serving index.html for path:', req.path);
  res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send(err);
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
