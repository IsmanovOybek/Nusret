import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import router from './router';
import morgan from 'morgan';
import { MORGAN_FORMAT } from './libs/config';
const app = express();
import ConnecyMongoDB from "connect-mongodb-session";

const MongoDBStore = ConnecyMongoDB(session)
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "sessions",
})

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(MORGAN_FORMAT))

// Sesseion 
app.use(
    session({
        secret: String(process.env.SESSION_SECRET),
        cookie: {
            maxAge: 1000 * 10, // 6 soat
        },
        store: store,
        resave: true,
        saveUninitialized: true
    })
)

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // yoki pug yoki html-ni render qiladigan narsa

// Routes
app.use("/", router);


export default app;