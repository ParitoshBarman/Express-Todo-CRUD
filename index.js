const http = require("http");
const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());


app.get("/",(req, res)=>{
    res.send("hello world");
})
app.get("/todos",(req, res)=>{
    let data= fs.readFileSync("./db.json", "utf-8")
    res.send(data);
})
app.post("/todo",(req, res)=>{
    let data= JSON.parse(fs.readFileSync("./db.json", "utf-8"))
    // console.log(req.body)
    let id = 0;
    if(data.todos.length!=0){
        id = data.todos[data.todos.length-1].id+1;
    }
    
    data.todos.push({...req.body, id:id});
    // console.log(data);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send("success")
})


app.get("/seteventrue", (req, res)=>{
    let data= JSON.parse(fs.readFileSync("./db.json", "utf-8"))
    let newlistdata = data.todos.map((itm)=>{
        if(itm.id%2==0){
            return {...itm, status:true};
        }
        else{
            return itm;
        }
    })

    data.todos = newlistdata;

    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(data);
})

app.delete("/deletestatustrue", (req, res)=>{
    let data= JSON.parse(fs.readFileSync("./db.json", "utf-8"))

    let newlistdata = data.todos.filter((itm)=>{
        if(itm.status==false){
            return true;
        }
        
    })

    data.todos = newlistdata;

    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(data);
})



app.listen(8080, ()=>{
    console.log("Server is listening...")
})