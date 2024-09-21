require('dotenv').config(); //chamando dotenv para não passar dados do banco no codigo, puxar do arquivo .env

const express = require('express');
const app = express();

//conecta com o banco do MongoDb
//process.env.CONNECTIONSTRING = retorna o valor da chave CONNECTIONSTRING que está no arquivo de extensão .env
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto') //Emit um sinal para o express após a conexão com o banco de dados
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
const { middlewareGlobal, outroMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

//Configuração de sessão
const sessionOptions = session({
    secret: 'asdhgjabsd asda sas dassfd oplmhoorfklg 134723dsiokjdsn89yt354690 n aa dsjaksdbka()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

//configuração das views
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

//configuração csrf token
app.use(csrf());
app.use(checkCsrfError)
app.use(csrfMiddleware)
//Nossos middlewares
app.use(middlewareGlobal)
app.use(outroMiddleware)
app.use(routes);

//Quando receber o sinal pronto(conexão com banco) ele irá executar a arrow function
app.on('pronto', () => {
    app.listen(3002, () => {
        console.log('Acessar http://localhost:3002');
        console.log('Servidor executando na porta 3002')
    })
})
