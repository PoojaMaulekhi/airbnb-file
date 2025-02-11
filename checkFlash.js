const express=require("express");
const app=express();
const flash=require("connect-flash");
const session=require("express-session");


app.use(session({
    secret:'code',
    saveUninitialized:'true',
    resave:'true',
}));
app.use(flash());

app.get("/",(req,res)=>{
    req.flash("info","hlw success");
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    res.send(req.flash("info"))
});

app.listen(8080, () => {
    console.log("Server running on port 3000");
  });
