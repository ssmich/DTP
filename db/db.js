const mongoose = require('mongoose');
const connectionString = "mongodb://localhost/dtp";
mongoose.connect(connectionString, {
                    useCreateIndex: true,
                    useNewUrlParser: true});

mongoose.connection.on("connected", ()=>{
    console.log(`mongoose connected on  ${connectionString}`);
});

mongoose.connection.on("disconnected", ()=>{
    console.log(`mongoose disconnected from  ${connectionString}`);
});

mongoose.connection.on("error", (err)=>{
    console.log(`mongoose error:  ${err}`);
});