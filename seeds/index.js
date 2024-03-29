const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://0.0.0.0:27017/northern-lights', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '645ef6a6e1d8262fa7db81cd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dodjz7fl6/image/upload/v1684216598/Northern-Lights/eqqwswrjz1jkkezxeeeq.jpg',
                    filename: 'Northern-Lights/eqqwswrjz1jkkezxeeeq'
                },
                {
                    url: 'https://res.cloudinary.com/dodjz7fl6/image/upload/v1684216097/Northern-Lights/bslkk0i04uzkq2t91gb9.jpg',
                    filename: 'Northern-Lights/bslkk0i04uzkq2t91gb9'
                }
            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis eligendi similique ullam neque suscipit sunt itaque quam sed minus, ducimus, minima fugiat! Quo repudiandae ea ipsam amet illo quisquam?',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [ 
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})