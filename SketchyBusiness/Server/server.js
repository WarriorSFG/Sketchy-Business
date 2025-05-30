const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const port = process.env.PORT
const URL = process.env.MONGOURL
const app = express()
app.use(express.json())
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))

mongoose.connect(URL)

const db = mongoose.connection

db.once('open', async () => {
  console.log("MongoDB connect successful");

  const existing = await Drawing.find({});
  if (existing.length === 0) {
    const hardcodedDrawings = [
  { customId: 1, title: "First Drawing", description: "My friend told me to draw this when she gave this sketchbook.", date: "15-11-2024" },
  { customId: 2, title: "Confused Anime Girl", description: "Awww, look at her face!", date: "16-11-2024" },
  { customId: 3, title: "My Friend", description: "Drew a portrait of my friend.", date: "17-11-2024" },
  { customId: 4, title: "Random dude", description: "I don't know why I drew this!.", date: "20-11-2024" },
  { customId: 5, title: "Eeeee", description: "Cute little anime girl with a hoodie.", date: "21-11-2024" },
  { customId: 6, title: "Ooh", description: "Anime girl with cute eyes.", date: "21-11-2024" },
  { customId: 7, title: "Challenge", description: "My friend told to redraw a drawing in my style.", date: "22-11-2024" },
  { customId: 8, title: "Lost", description: "A girl in the woods with evening clouds.", date: "26-11-2024" },
  { customId: 9, title: "King of the Hill", description: "Let me show you who is the boss.", date: "28-11-2024" },
  { customId: 10, title: "F1 - 1", description: "Failed attempt to draw a F1 racing car", date: "30-11-2024" },
  { customId: 11, title: "F1 - 2", description: "Finally drew a F1 racing car.", date: "01-12-2024" },
  { customId: 12, title: "Cute Anime Girl", description: "Drew a girl with a lot of details.", date: "03-12-2024" },
  { customId: 13, title: "A Lovely Sunset", description: "When the sun sets down, our hopes rise up.", date: "06-12-2024" },
  { customId: 14, title: "Secret Admirer", description: "Do you even know who loves you?.", date: "10-12-2024" },
  { customId: 15, title: "Help!", description: "I'm lost, I'm not scared, or I thought..", date: "12-12-2024" },
  { customId: 16, title: "Comon then!", description: "Watch me as I show you how it's done.", date: "22-12-2024" },
  { customId: 17, title: "Weeeee!", description: "I feel like I can fly!", date: "30-12-2024" },
  { customId: 18, title: "HEY!", description: "He's too busy! Give me some time!!", date: "14-01-2025" },
  { customId: 19, title: "Me and friend", description: "Me and my friend when we went in Alcheringa event", date: "01-02-2025" },
  { customId: 20, title: "Text..text...", description: "Comon... I'm waiting for you reply :(", date: "29-03-2025" },
  { customId: 21, title: "LOVE", description: "I'M NOT MAD, I'M NOT IN LOVE, I AM MAD IN LOVE!", date: "05-04-2025" },
  { customId: 22, title: "Some Singer", description: "Friend sent this photo to draw.", date: "27-05-2025" },
  { customId: 23, title: "Not So Romantic", description: "Oh, how much I wish...", date: "27-05-2025" },
  { customId: 24, title: "What Are You Doing~", description: "First ever pencil sketch I made", date: "29-05-2025" }
];


    await Drawing.insertMany(hardcodedDrawings);
    console.log("Inserted hardcoded drawings into DB");
  }
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const drawingSchema = new mongoose.Schema({
  customId: Number,
  title: String,
  description: String,
  date: String,
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }] 
});

const Users = mongoose.model("data", userSchema)

const Drawing = mongoose.model('Drawing', drawingSchema);

app.post('/api/drawings/:id/like', async (req, res) => {
  const { username } = req.body;
  const customId = Number(req.params.id);

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const drawing = await Drawing.findOne({ customId });

    if (!drawing) return res.status(404).json({ message: "Drawing not found" });

    const alreadyLiked = drawing.likedBy.includes(username);

    if (alreadyLiked) {
      drawing.likes--;
      drawing.likedBy = drawing.likedBy.filter(u => u !== username);
    } else {
      drawing.likes++;
      drawing.likedBy.push(username);
    }

    await drawing.save();
    res.json({ likes: drawing.likes, liked: !alreadyLiked, likedBy:drawing.likedBy});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/drawings/:id/getlike', async (req, res) => {
  const { username } = req.body;
  const customId = Number(req.params.id);

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const drawing = await Drawing.findOne({ customId });

    if (!drawing) return res.status(404).json({ message: "Drawing not found" });

    res.json({likedBy:drawing.likedBy});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get('/register', (req, res) => {
    console.log("Attempt to access test")
    res.json({ 'Test sucessful': "Why are you on this page?" })
})

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const user = new Users({
        username,
        password
    })

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await Users.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ error: 'Username already taken' });
    }
    await user.save()
    console.log(user)
    res.json({ 'RegStatus': "Success, Please go back and login" })
})

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login request:', username, password);

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await Users.findOne({ username });
    console.log('Found user:', existingUser);

    if (!existingUser) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    if (password === existingUser.password) {
      return res.json({ status: 'Success', message: 'Successfully logged in' });
    } else {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    // This should also have a return so no code runs after
    return res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/drawings', async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.json(drawings);
  } catch (err) {
    console.error("Error fetching drawings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => {
    console.log(`server started, listening to port ${port}`)

})
