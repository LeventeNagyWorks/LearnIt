const cors = require("cors")
const dotenv = require("dotenv")
const express = require("express")
const fs = require("fs")
const path = require('path');
const expressFileupload = require("express-fileupload");
const { log } = require("console");
const txtToJSON = require("./txtToJSON");

if (process.env.NODE_ENV != "production") {
  dotenv.config()
}

const data = [];

const app = express();
const port = 3001; // You can use any port you prefer

app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(expressFileupload()) // Add this middleware to enable file uploads

app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFiles = Array.isArray(req.files.file) ? req.files.file : [req.files.file];

  for (const file of uploadedFiles) {
    const fileContent = file.data.toString('utf8');
    const parsedData = txtToJSON({ name: file.name, content: fileContent });
    
    const existingData = await fs.promises.readFile('./data.json', 'utf8');
    const newData = JSON.parse(existingData);
    newData.push(parsedData);

    await fs.promises.writeFile('./data.json', JSON.stringify(newData, null, 2));
  }

  res.send(`Files uploaded successfully!`);
});

app.get('/data', async (req, res) => {
  try {
    const data = await fs.promises.readFile('./data.json', 'utf8');
    if (data) {
      res.json(JSON.parse(data));
    } else {
      res.json([]); // Return an empty array if the file is empty
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read data.json' });
  }
});

if (!fs.existsSync('./data.json')) {
  fs.writeFileSync('./data.json', '[]');
}

app.delete('/delete/:itemName', async (req, res) => {
  const { itemName } = req.params;
  try {
    const data = await fs.promises.readFile('./data.json', 'utf8');
    const newData = JSON.parse(data).filter((item) => item.name !== itemName);
    fs.writeFileSync('./data.json', JSON.stringify(newData, null, 2));
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});