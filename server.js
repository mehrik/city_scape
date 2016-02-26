var express = require('express');
var path = require('path');
var app = express();
// Points to client folder
app.use(express.static(path.join(__dirname, './client')));

app.listen(5000, function() {
    console.log("    //////////////");
    console.log("   ////      ////");
    console.log("  //// 5000 ////");
    console.log(" ////      ////");
    console.log("//////////////");
})