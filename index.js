import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import { connextDB } from "./config/db.js";
import personRoute from "./routers/personRoute.js";
import authRoute from "./routers/authRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(session({
  secret: 'sample-secret',
  resave: false,
  saveUninitialized: false
}))

app.use(express.json());

await connextDB();


////Routes
app.use('/person', personRoute);
app.use('/auth', authRoute);

app.get('/dashboard', (req, res) => {
  if(!req.session.user){
    return res.send("Unauthorized")
  }
  res.send(`Welcome ${req.session.user.userName}`)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})