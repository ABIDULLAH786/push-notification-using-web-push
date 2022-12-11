const express = require("express");
const web_push = require("web-push");
const path = require("path");
const app = new express();
app.use(express.json());
// app.use(express.JSON())

// set static path
app.use(express.static(path.join(__dirname,'client')));

// run this command from backend main directory or
// ./node_modules/.bin/web-push generate-vapid-keys

const keys = {
    Public_Key:"BLLyyhnGacdjD1w0vVaJ80irUywFAMIJm_QXXvwnYI7ajpfPjZ8o2Nfkt83k-GVhvYtbA1TmR2D3WrVYCHscZxo",
    Private_Key:"bHpYBRh3a5dlCD5pu7lsLVCuLWUTgNzP-LnS9-9tim8"
}
web_push.setVapidDetails('mailto:test@test.com', keys.Public_Key, keys.Private_Key)


// Subscribe Route
app.post('/subscribe',(req,res)=>{
    // Get pushSubscription object
    const subscription = req.body;

    // Send Success Code 201: source created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({title:"Push Test"});

    // pass object into sendNotification
    web_push.sendNotification(subscription, payload).catch(err=>console.error(err));

});




app.listen(5555, () => {
    console.log("server is running...");
})
