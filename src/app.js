import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import viewsRouter from "./routes/viewsRouter.js";
import userRouter from "./routes/userRouter.js";

// Instanciamos express
const app = express();

// Conectamos a la BD
mongoose.connect('mongodb+srv://xnicoescobar:MFSmvc6kuIHYtjFQ@cluster0.jwjnfyr.mongodb.net/?retryWrites=true&w=majority');

// Indicamos json en body y url params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso de sesiones de MongoDB
app.use(
    session({
        store: MongoStore.create({
            mongoUrl:
            'mongodb+srv://xnicoescobar:MFSmvc6kuIHYtjFQ@cluster0.jwjnfyr.mongodb.net/?retryWrites=true&w=majority',
            ttl: 10,
        }),
        secret: 'jlkfaslkjf234lkdaslk3219dw',
        resave: false,
        saveUninitialized: false,
    })
);

// Configuramos handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

// Funcamos la app :)
app.listen(8080, () => console.log('👾 funcando 👾'));

// Configuramos routers
app.use('/api', userRouter);
app.use('/', viewsRouter);