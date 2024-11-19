const express=require("express");
const mongoose = require("mongoose");
const app=express();
const listing=require("./listing.js");
const path= require("path");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const { console } = require("inspector");
 const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");


app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.set("views", path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main()
.then(()=>{
    console.log("working");
})
.catch(err=>{
   console.log(err)
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/project_airbnb');
}

app.listen(8080,()=>{
  console.log("port is hearing u");
});

app.get("/",  (req,res)=>{
      res.send("Start exploring  beautiful cities  all over the world");
  });

  app.get("/listings",wrapAsync(async (req,res)=>{
   const allListings=await listing.find({});
   res.render("index.ejs",{allListings});
  }));

  app.get("/listings/new",(req,res)=>{
    res.render("new.ejs");
  });

  app.post("/listings",wrapAsync(async(req,res,next)=>{
    // let result=listingSchema.validate(req.body);
    // console.log(result);  request not get from hoppscoth
      const newlisting=new listing(req.body.listing);
      await newlisting.save();
      res.redirect("/listings");
  }));
  
//   // show error  part1 delete and edit route vali nhi dekhi
app.get("/listings/:id", (req, res, next) => {
  console.log("Received ID:", req.params.id);
  next();
});

  app.get("/listings/:id", wrapAsync(async (req, res) => {
        const { id } = req.params;
        console.log(id);
        const List = await listing.findById(id);
        res.render("show.ejs", { List });
}));

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});






