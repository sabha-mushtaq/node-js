const fs = require('fs');

// creating a middleware for logging text in a file
function logreqres(filename) {
    return(req,res,next)=>{
        fs.appendFile("filename",`\n${Date.now()}:${req.ip}:${req.method}:${req.path}\n`,
(err,data)=>{
next()


}

        )
    }
}
module.exports = {

    logreqres
}