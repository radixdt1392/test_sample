
function errorHandler(err, req, resp, next) {
    console.error('Error', err.mesage);
    console.error('Error', err.stack);

    // Defauls 
    const statusCode = err.statusCode || 500;
    const message = err.mesage || 'somthing went Wrong !!';

    if (req.headers['content-type'] === 'application/json') {
        return resp.status(statusCode).json({
            success: false,
            message: message
        });
    }
    // If page request — render error page
    resp.status(statusCode).render('error', {
        pageName: 'Error',
        statusCode: statusCode,
        message: message
    });
    

}
module.exports = errorHandler