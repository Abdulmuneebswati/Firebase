const { async } = require("@firebase/util");
const express= require("express");
const admin = require("firebase-admin");
const credentials = require("./nodewithfb-3eeb6-firebase-adminsdk-f58lo-7a8cbe97b0.json")
const app = express();


admin.initializeApp({
    credential:admin.credential.cert(credentials)
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const db = admin.firestore();

app.post("/",async(req,res)=>{
    try {
        const id = req.body.email;
        const userJson = {
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
        }
        const response =  db.collection("users").add(userJson);
        res.send("User Created Successfully");
    } catch (error) {
        console.log(error);
    }
})

// get all users
app.get("/",async(req,res)=>{
    try {
        const useRef = db.collection("users");
        const response = await useRef.get();
        let resArr = [];
        response.forEach((doc)=>{
            resArr.push(doc.data())
        })
        res.send(resArr);
        
    } catch (error) {
        console.log(error);
    }
})

// read individual user
app.get("/read/:id",async(req,res)=>{
    try {
        const useRef = db.collection("users").doc(req.params.id);
        const response = await useRef.get();
        res.send(response.data());
    } catch (error) {
        console.log(error);
    }
})

// update
app.patch("/read/:id",async(req,res)=>{
        try {
            const firstName = req.body.firstName;
        const useRef = db.collection("users").doc(req.params.id).update(req.body);
            res.send(useRef)
        } catch (error) {
        console.log(error);
        }
})

// delete user
app.delete("/read/:id",async(req,res)=>{
    try {
    const useRef = db.collection("users").doc(req.params.id).delete();
        res.send(useRef)
    } catch (error) {
    console.log(error);
    }
})

app.listen("6000",()=>{
    console.log("connected");
})  