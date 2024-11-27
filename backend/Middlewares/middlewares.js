const { z } = require("zod");

// signup auth

function auth(req, res, next) {
  const reqbody = z.object({
    email: z.string().email({message: "invalid email! please enter a valid email"}).max(70),
    password: z.string().min(6).max(50),
    firstname: z.string().min(2).max(20),
    lastname: z.string().min(2).max(20),
  }).strict();

  const parseddata = reqbody.safeParse(req.body);

  if (!parseddata.success) {
    res.status(422).json({
      message: parseddata.error.issues[0].message,
    });
  } else {
    req.body = parseddata.data;
    next();
  }
}

function authlogin(req, res, next){
  try{const reqbody = z.object({
    email: z.string().email().max(70),
    password: z.string().min(6).max(50),
  }).strict();

  const parseddata = reqbody.safeParse(req.body);
  if(!parseddata.success){
      return res.status(422).json({
          message: parseddata.error.issues[0].message
      });
  }
  req.body = parseddata.data;
  next();
}catch(e){
      res.send(e);
}}


function authentication(req, res, next){

  const token = req.headers.token;
  if (!token) {
    return res.status(412).json({ message: "Login First" });
  }else{
    req.val = token;
    next();
  }
}
module.exports = {
  auth, authlogin, authentication
};
