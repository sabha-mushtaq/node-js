const jwtauth = require('jsonwebtoken');
const jwt = (req,res,next)=>{

const token = (req.cookies && req.cookies.token) || null
if (!token) {
    return res.status(400).json({

sucess : false,
message : 'not authorized'



    })
}
try {
    const payload = jwtauth.verify(token,process.env.API_KEY);
    req.user ={id:payload.id,email:payload.email}
} catch (e) {
   return res.status.json({
sucess:false,
message: e.message




   })

}


next()
}
module.exports ={
jwt


}