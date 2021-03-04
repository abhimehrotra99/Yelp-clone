const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '60389a577c7622293086efea',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/abhimehrotra99/image/upload/v1614624282/YelpCamp/myev6hq65m6dewpk4rol.jpg',
                    filename: 'YelpCamp/myev6hq65m6dewpk4rol'
                },
                {
                    url: 'https://res.cloudinary.com/abhimehrotra99/image/upload/v1614624281/YelpCamp/mbvkfhy0ietthgouxadr.jpg',
                    filename: 'YelpCamp/mbvkfhy0ietthgouxadr'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus commodi quas ipsam vitae libero explicabo aliquam illo id molestiae aperiam iusto nostrum dolorem impedit unde, consequuntur, veniam suscipit sed ratione.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})