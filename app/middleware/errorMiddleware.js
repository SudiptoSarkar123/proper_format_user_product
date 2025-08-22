const errorHandler = (err, req, res, next)=>{
    console.log(err.stack);

    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Something went wrong!'

    return res.status(statusCode).json({
        success:false,
        message:message,
        stack:process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
}


module.exports = errorHandler