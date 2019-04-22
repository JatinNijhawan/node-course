const express=require("express");
const hbs=require("hbs"); //Handlebars
const fs=require("fs");

let port=process.env.PORT||3001;
let app=express();
hbs.registerPartials(__dirname + "/views/partails");
hbs.registerHelper("getCurrentYear",()=>{
    return new Date().getFullYear();
})
hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase();
})
app.set("view engine","hbs");
app.use(express.static(__dirname+"/public"));

app.use((req,res,next)=>{
    let now=new Date().toString();
    let log=`${now} ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFileSync("server-log.js",log+"\n");
    next();
});


// app.use((req,res,next)=>{
// res.render("maintenance.hbs")
// });

app.get("/",(req,res)=>{
    res.render("home.hbs",{
        pageTitle:"Home Page",
        headerTitle:"Welcome to Home Page"
    });
});


app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        pageTitle:"About page",
        headerTitle:"Welcome to About Page",
    });
});


app.get("/bad",(req,res)=>{
    res.send({error:"Unable to send request to server"});
});

app.listen(port,()=>{
    console.log(`ManazeServer is now running on http://localhost:${port}`)
});