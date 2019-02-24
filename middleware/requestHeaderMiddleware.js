var createError = require('http-errors');
const requestHeaderMiddleware = (req,res,next) =>{
    let xsecret = req.header('X-Secret');
    if(xsecret === '1234')
    {
        next();
    }
    else
    {
        next(createError(401));
    }

}

module.exports = requestHeaderMiddleware;