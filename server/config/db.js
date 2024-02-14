import mongoose from 'mongoose';

// For localhost connection
const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        console.log(`MongoDB is Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[DATABASE_CONNECTION_ERROR]: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;