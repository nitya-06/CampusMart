module.exports = asyncTry => (req,res,next) =>{
    Promise.resolve(asyncTry(req,res,next)).catch(next);
};

// it try to resolve async call if not then call next function