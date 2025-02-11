const express = require("express");
const mongoose = require("mongoose");
const app=express();
const path = require("path");
const ejs = require('ejs');
const User=require("./schema.js");
const session=require("express-session");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
 

app.use(cookieParser('secret'));

const sessionOptions={
  secret:"mysecret",
  resave:false,
  saveUninitialized:true,
  cookie:{
    httpOnly:true,
    maxAge:7*24*60*60*1000,
    expires:Date.now()+7*24*60*60*1000,
  }
};
app.use(flash());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    req.flash("success","hlw success");
    res.redirect("/portfolio");
});
 

app.use(function(req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error=req.flash("here its a failure!!");
  next();
});

// app.get("/portfolio/front", (req, res) => {
//   res.render("front.ejs");
// });

app.get("/portfolio", (req, res) => {
req.flash("success");
  res.render("portfolio.ejs");
});


app.get('/portfolio/liked', (req, res) => {
  res.render('liked.ejs');
});


app.get("/portfolio/education", (req, res) => {
  res.render("education.ejs");
});

app.get("/portfolio/skills", (req, res) => {
  res.render("skills.ejs");
});

app.get("/portfolio/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/portfolio/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/portfolio/project", (req, res) => {
  res.render("project.ejs");
});

app.get("/portfolio/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register",(req,res)=>{
const newUser = new User({
  username: req.body.username,
  password: req.body.password,
});
newUser.save();
console.log(req.body);
res.render("portfolio.ejs");
})


mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    main();
  })
  .catch(err => console.log(err));

async function main() {
  try {
    console.log("working");
  } catch (err) {
    console.error(err);
  }
}
app.listen(3000, () => {
  console.log("Server running on port 3000");
});







