const mongoose = require('mongoose');

//Tratamento dos dados na memoria para enviar para o banco de dados
const HomeSchema = new mongoose.Schema({
    titulo: {type : String, required: true},
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema); //envia o dado em memoria para o banco de dados

class Home {

}

module.exports = Home;
