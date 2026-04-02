import mongoose from 'mongoose';

const dbconnection = async () => {
    try {

        const mongo = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected ${mongo.connection.host} ${mongo.connection.name}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB:  ${error.message}`);
        process.exit(1);
    }
}

export default dbconnection;