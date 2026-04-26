require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        // Check if admin already exists
        const userExists = await User.findOne({ email: 'admin@crm.com' });

        if (!userExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            await User.create({
                name: 'Admin User',
                email: 'admin@crm.com',
                password: hashedPassword
            });
            console.log('Admin user seeded: admin@crm.com / admin123');
        } else {
            console.log('Admin user already exists');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
