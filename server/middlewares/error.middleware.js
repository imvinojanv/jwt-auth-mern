// `next` is just the callback that we fire off once we're done and we're basically saying run the next piece of meddleware
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    console.log("errorHandler middleware is called");
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;     // check the status code
    let message = err.message;

    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};