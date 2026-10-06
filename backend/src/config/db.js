const mongoose = require('mongoose');
const seedData = require('./seed');

let mongodInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/enterprise_ems';

  try {
    console.log(`📡 Connecting to MongoDB at: ${uri}...`);
    // Try connecting with a 3.5s timeout to avoid hanging if local mongo daemon is down
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3500,
    });
    console.log(`🚀 Connected to MongoDB host: ${mongoose.connection.host}`);
    await seedData();
  } catch (initialError) {
    console.warn(`⚠️ Standard MongoDB connection to ${uri} failed: ${initialError.message}`);
    console.log('🔄 Spinning up embedded in-memory MongoDB server for zero-setup execution...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create({
        instance: { dbName: 'enterprise_ems' },
        spawn: { timeout: 60000 },
      });
      const memUri = mongodInstance.getUri();
      console.log(`🌐 Embedded MongoDB ready at: ${memUri}`);

      await mongoose.connect(memUri);
      console.log(`🚀 Connected to embedded MongoDB successfully!`);
      await seedData();
    } catch (memError) {
      console.error('❌ Failed to start embedded MongoDB as well:', memError.message);
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};

module.exports = { connectDB, disconnectDB };
