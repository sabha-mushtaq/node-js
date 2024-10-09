const mongoose = require('mongoose');
async function connecttodb(url) {
    try {
       await  mongoose.connect(url)
        console.log('sucessfully connected to db');
        
    } catch (error) {
        console.log('error connecting to db',error);
        
    }
}
module.exports = {

connecttodb

}