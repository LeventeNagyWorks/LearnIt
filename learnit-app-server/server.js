const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs');
const path = require('path');
const expressFileupload = require('express-fileupload');
const txtToJSON = require('./txtToJSON');
const mongoose = require('mongoose');
const MUser = require('./models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 3001;
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(expressFileupload());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose.set('strictQuery', true);
mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log('Connected to the database'))
  .catch(e => {
    console.error('Failed to connect to the database');
    console.log('Error:');
    console.log(e);
  });

if (!fs.existsSync('./data.json')) {
  fs.writeFileSync('./data.json', '[]');
}

app.post('/api/updateQuestionState', async (req, res) => {
  const { itemName, questionText, newState, correctCount } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await MUser.findById(decoded.userId);

    // Update the specific question state
    await MUser.updateOne(
      {
        _id: decoded.userId,
        'studySets.name': itemName,
        'studySets.questions.question': questionText,
      },
      {
        $set: {
          'studySets.$[set].questions.$[que].learningState': newState,
          'studySets.$[set].questions.$[que].correctCount': correctCount,
        },
      },
      {
        arrayFilters: [
          { 'set.name': itemName },
          { 'que.question': questionText },
        ],
      }
    );

    // Calculate new totals
    let mastered = 0;
    let learning = 0;
    let notStarted = 0;

    user.studySets.forEach(set => {
      set.questions.forEach(question => {
        switch (question.learningState) {
          case 'mastered':
            mastered++;
            break;
          case 'learning':
            learning++;
            break;
          case 'notStarted':
            notStarted++;
            break;
        }
      });
    });

    // Update the totals
    await MUser.findByIdAndUpdate(decoded.userId, {
      allMastered: mastered,
      allLearning: learning,
      allNotStarted: notStarted,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error updating question state:', err);
    res.status(500).json({ error: 'Failed to update question state' });
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

// Add this new endpoint for API consistency
app.get('/api/data', async (req, res) => {
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
          'studySets.questions.question': state.question,
        },
        {
          $set: {
            'studySets.$[set].questions.$[que].learningState': state.state,
          },
        },
        {
          arrayFilters: [
            { 'set.name': itemName },
            { 'que.question': state.question },
          ],
        }
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error updating question states:', err);
    res.status(500).json({ error: 'Failed to update question states' });
  }
});

app.post('/api/updateProfilePicture', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (!req.files || !req.files.avatar) {
      return res.status(400).send('No image uploaded');
    }

    const avatar = req.files.avatar;
    const base64Image = avatar.data.toString('base64');

    await MUser.findByIdAndUpdate(decoded.userId, {
      $set: {
        avatar: base64Image,
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error updating profile picture:', err);
    res.status(500).json({ error: 'Failed to update profile picture' });
  }
});

app.get('/api/defaultProfilePicture', (req, res) => {
  const defaultImagePath = path.join(
    __dirname,
    'images',
    'default_profile_pic.png'
  );
  res.sendFile(defaultImagePath);
});

app.get('/api/getUserProfile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await MUser.findById(decoded.userId);
    res.json({
      username: user.username,
      displayName: user.displayName,
      description: user.description,
      avatar: user.avatar,
      allMastered: user.allMastered,
      allLearning: user.allLearning,
      allNotStarted: user.allNotStarted,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

app.get('/api/searchUsers', async (req, res) => {
  const { query } = req.query;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Please log in again' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const users = await MUser.find({
      $and: [
        { _id: { $ne: decoded.userId } },
        {
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { displayName: { $regex: query, $options: 'i' } },
          ],
        },
      ],
    }).select('username displayName avatar requestSent');

    console.log('Found users:', users); // Ellenőrizd, hogy milyen felhasználókat talált
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    return res
      .status(401)
      .json({ message: 'Session expired, please log in again' });
  }
});

app.post('/api/sendFriendRequest', async (req, res) => {
  const { recipientId } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    await MUser.findByIdAndUpdate(recipientId, {
      $addToSet: { friendRequests: decoded.userId },
    });

    await MUser.findByIdAndUpdate(decoded.userId, {
      $addToSet: { sentRequests: recipientId },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error sending friend request:', err);
    res.status(500).json({ error: 'Failed to send friend request' });
  }
});

app.get('/api/getPendingRequests', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const currentUser = await MUser.findById(decoded.userId);

    // Get users who sent requests to current user
    const receivedRequests = await MUser.find({
      _id: { $in: currentUser.friendRequests },
    }).select('username displayName avatar');

    // Get users to whom current user sent requests
    const sentRequests = await MUser.find({
      friendRequests: decoded.userId,
    }).select('username displayName avatar');

    res.json({
      receivedRequests,
      sentRequests,
    });
  } catch (err) {
    console.error('Error fetching pending requests:', err);
    res.status(500).json({ error: 'Failed to fetch pending requests' });
  }
});

app.post('/api/acceptFriendRequest', async (req, res) => {
  const { userId } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Add to friends list for both users
    await MUser.findByIdAndUpdate(decoded.userId, {
      $addToSet: { friends: userId },
      $pull: { friendRequests: userId },
    });

    await MUser.findByIdAndUpdate(userId, {
      $addToSet: { friends: decoded.userId },
      $pull: { sentRequests: decoded.userId },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error accepting friend request:', err);
    res.status(500).json({ error: 'Failed to accept friend request' });
  }
});

app.post('/api/rejectFriendRequest', async (req, res) => {
  const { userId } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Remove friend request
    await MUser.findByIdAndUpdate(decoded.userId, {
      $pull: { friendRequests: userId },
    });

    await MUser.findByIdAndUpdate(userId, {
      $pull: { sentRequests: decoded.userId },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error rejecting friend request:', err);
    res.status(500).json({ error: 'Failed to reject friend request' });
  }
});

app.get('/api/getFriends', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await MUser.findById(decoded.userId);
    const friends = await MUser.find({
      _id: { $in: user.friends },
    }).select('username displayName avatar');

    res.json({ friends });
  } catch (err) {
    console.error('Error fetching friends:', err);
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

app.post('/api/removeFriend', async (req, res) => {
  const { friendId } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Remove friend from both users' friend lists
    await MUser.findByIdAndUpdate(decoded.userId, {
      $pull: { friends: friendId },
    });

    await MUser.findByIdAndUpdate(friendId, {
      $pull: { friends: decoded.userId },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error removing friend:', err);
    res.status(500).json({ error: 'Failed to remove friend' });
  }
});

app.post('/upload', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (!req.files || !req.files.file) {
      return res.status(400).send('No file uploaded');
    }

    const file = req.files.file;
    const parsedData = txtToJSON({
      content: file.data,
      name: Buffer.from(file.name, 'latin1').toString('utf8'),
    });

    const questionsWithIds = parsedData.questions.map(question => ({
      ...question,
      answer: question.answer.map(ans => ({
        ...ans,
        _id: ans._id || new mongoose.Types.ObjectId(),
      })),
    }));

    const fileName = Buffer.from(file.name, 'latin1')
      .toString('utf8')
      .replace(/\.txt$/i, '');

    // First update the study sets with owner field
    await MUser.findByIdAndUpdate(decoded.userId, {
      $push: {
        studySets: {
          name: fileName,
          owner: decoded.userId,
          questions: questionsWithIds,
        },
      },
    });

    // Then get the updated user data to count states
    const user = await MUser.findById(decoded.userId);
    let mastered = 0;
    let learning = 0;
    let notStarted = 0;

    user.studySets.forEach(set => {
      set.questions.forEach(question => {
        switch (question.learningState) {
          case 'mastered':
            mastered++;
            break;
          case 'learning':
            learning++;
            break;
          case 'notStarted':
            notStarted++;
            break;
        }
      });
    });

    // Update the totals
    await MUser.findByIdAndUpdate(decoded.userId, {
      allMastered: mastered,
      allLearning: learning,
      allNotStarted: notStarted,
    });

    res.json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error('Error processing upload:', err);
    res.status(500).json({ error: 'Failed to process file upload' });
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

    // Delete the study set
    await MUser.findByIdAndUpdate(decoded.userId, {
      $pull: {
        studySets: { name: itemName },
      },
    });

    // Get the updated user data to recalculate totals
    const user = await MUser.findById(decoded.userId);
    let mastered = 0;
    let learning = 0;
    let notStarted = 0;

    user.studySets.forEach(set => {
      set.questions.forEach(question => {
        switch (question.learningState) {
          case 'mastered':
            mastered++;
            break;
          case 'learning':
            learning++;
            break;
          case 'notStarted':
            notStarted++;
            break;
        }
      });
    });

    // Update the totals
    await MUser.findByIdAndUpdate(decoded.userId, {
      allMastered: mastered,
      allLearning: learning,
      allNotStarted: notStarted,
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
        'studySets.name': itemName,
      },
      {
        $set: { 'studySets.$.isFavorite': isFavorite },
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

  console.log('Registration attempt:', {
    username,
    email,
    passwordLength: password?.length,
  });

  try {
    // Validate input
    if (!username || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if username already exists
    console.log('Checking for existing username:', username);
    const existingUsername = await MUser.findOne({ username });
    if (existingUsername) {
      console.log('Username already exists:', username);
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if email already exists
    console.log('Checking for existing email:', email);
    const existingEmail = await MUser.findOne({ email });
    if (existingEmail) {
      console.log('Email already exists:', email);
      return res.status(400).json({ error: 'Email already exists' });
    }

    console.log('Creating new user...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new MUser({
      username,
      email,
      password: hashedPassword,
    });

    console.log('Attempting to save user to database...');
    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser._id);

    res.status(201).json({
      message: 'User registered successfully',
      userId: savedUser._id,
    });
  } catch (error) {
    console.error('Registration error details:', error);
    console.error('Error stack:', error.stack);
    res
      .status(500)
      .json({ error: 'Failed to register user: ' + error.message });
  }
});

app.post('/login', async (req, res) => {
  const { emailOrUsername, password, rememberMe } = req.body;

  try {
    // Find user by either email or username
    const user = await MUser.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: rememberMe ? '30d' : '24h' }
    );

    res.json({
      token,
      username: user.username,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/updateQuestion', async (req, res) => {
  const { itemName, questionIndex, questionText, answers, questionType } =
    req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Ensure answers have IDs
    const answersWithIds = answers.map(ans => ({
      ...ans,
      _id: ans._id || new mongoose.Types.ObjectId(),
    }));

    // Update the specific question
    await MUser.updateOne(
      {
        _id: decoded.userId,
        'studySets.name': itemName,
      },
      {
        $set: {
          [`studySets.$.questions.${questionIndex}.question`]: questionText,
          [`studySets.$.questions.${questionIndex}.answer`]: answersWithIds,
          [`studySets.$.questions.${questionIndex}.que_type`]:
            questionType || 'Choice',
        },
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).json({ error: 'Failed to update question' });
  }
});

app.post('/api/addQuestion', async (req, res) => {
  const { itemName, questionText, answers, questionType } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Add IDs to answers
    const answersWithIds = answers.map(ans => ({
      ...ans,
      _id: new mongoose.Types.ObjectId(),
    }));

    // Create the new question object
    const newQuestion = {
      question: questionText,
      answer: answersWithIds,
      que_type: questionType || 'Choice',
      learningState: 'notStarted',
      correctCount: 0,
    };

    // Add the new question to the specified study set
    await MUser.updateOne(
      {
        _id: decoded.userId,
        'studySets.name': itemName,
      },
      {
        $push: {
          'studySets.$.questions': newQuestion,
        },
      }
    );

    // Get the updated user data to recalculate totals
    const user = await MUser.findById(decoded.userId);
    let mastered = 0;
    let learning = 0;
    let notStarted = 0;

    user.studySets.forEach(set => {
      set.questions.forEach(question => {
        switch (question.learningState) {
          case 'mastered':
            mastered++;
            break;
          case 'learning':
            learning++;
            break;
          case 'notStarted':
            notStarted++;
            break;
        }
      });
    });

    // Update the totals
    await MUser.findByIdAndUpdate(decoded.userId, {
      allMastered: mastered,
      allLearning: learning,
      allNotStarted: notStarted,
    });

    res.json({ success: true, message: 'Question added successfully' });
  } catch (err) {
    console.error('Error adding question:', err);
    res.status(500).json({ error: 'Failed to add question' });
  }
});

app.post('/api/updateProfile', async (req, res) => {
  const { username, displayName, description } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    await MUser.findByIdAndUpdate(decoded.userId, {
      $set: {
        username,
        displayName,
        description,
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.delete('/api/deleteQuestion', async (req, res) => {
  const { itemName, questionIndex } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await MUser.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const studySet = user.studySets.find(set => set.name === itemName);
    if (!studySet) {
      return res.status(404).json({ error: 'Study set not found' });
    }

    if (questionIndex < 0 || questionIndex >= studySet.questions.length) {
      return res.status(400).json({ error: 'Invalid question index' });
    }

    // Remove the question at the specified index
    studySet.questions.splice(questionIndex, 1);

    // Save the updated user document
    await user.save();

    // Recalculate totals
    let mastered = 0;
    let learning = 0;
    let notStarted = 0;

    user.studySets.forEach(set => {
      set.questions.forEach(question => {
        switch (question.learningState) {
          case 'mastered':
            mastered++;
            break;
          case 'learning':
            learning++;
            break;
          default:
            notStarted++;
        }
      });
    });

    // Update the totals
    await MUser.findByIdAndUpdate(decoded.userId, {
      allMastered: mastered,
      allLearning: learning,
      allNotStarted: notStarted,
    });

    res.json({
      success: true,
      message: 'Question deleted successfully',
      remainingQuestions: studySet.questions.length,
    });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});
