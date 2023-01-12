const express =require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose=require("mongoose")

const app=express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/blogdb",{useNewUrlParser:true},mongoose.set('strictQuery', false));

const dataentryscheme={
desc:String
}

const logentryscheme={
    log:String
}

let val=0;


const dataentry=mongoose.model("dataentry",dataentryscheme);//model for store the input value
const logentry=mongoose.model("logentry",logentryscheme);//model for the log recording



app.get("/",function(req,res){
    res.render("index");//index page
})


const dat=new Date();

app.post("/values",function(req,res){
    console.log("db got connected");
    const text=req.body.text1;   
    const de1=new dataentry({//creation of new instance
        desc:text
    });
    val=val+1
    const lg1=new logentry({//for log and it als takes time as its log field
        //now we go to git task
        log:"Data inserted "+val+" at "+dat.getHours()+" : "+dat.getMinutes()
    });

    de1.save(function(err){
        if(!err){
            console.log("data got inseted "+val);
            res.render("sc");
        }
        else{
            res.send("data not inserted");
        }
    })

    lg1.save(function(err){
        if(!err){
            console.log("log got registered"+val);
        }
        else{
            console.log("log not registered");
        }
    })


})


app.listen(3000,function(){
    console.log("Initilaised the server3000");//for creation of server
})