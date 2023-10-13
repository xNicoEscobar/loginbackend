import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from './routes/userRouter.js'
import initEvents from "./socket/index.js";

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
const httpServer = app.listen(8080, () => console.log('👾 funcando 👾'));
const socketServer = new Server(httpServer);

// Configuramos routers
app.use('/api', userRouter);
app.use('/', viewsRouter);