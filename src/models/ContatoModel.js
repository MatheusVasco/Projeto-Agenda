const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

//Tratamento dos dados na memoria para enviar para o banco de dados
const ContatoSchema = new mongoose.Schema({
    nome: {type : String, required: true},
    sobrenome: {type : String, required: false, default: ''},
    email: {type : String, required: false, default: ''},
    telefone: {type : String, required: false, default: ''},
    criadoEm: {type : Date, default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema); //envia o dado em memoria para o banco de dados

function Contato(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function() {
    this.valida()

    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);

}

Contato.prototype.valida = function(){
    this.cleanUp(); //Limpar o objeto
    //Validação
    //O e-mail precisa ser valido
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.')
    if(!this.body.email && !this.body.telefone) this.errors.push('Preencha o telefone ou o e-mail do contato.')
}

Contato.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] != "string") {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}

Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true}); //procura e atualiza o contato pelo id
}

//Métodos estáticos
Contato.buscaPorId = async function(id){
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id); //Faz a busca pelo id
    return contato;
}
Contato.buscaContatos = async function(){
    const contatos = await ContatoModel.find().sort({ criadoEm: -1 }); //busca todos os contatos filtrados pela criação na ordem decrescente
    // const contatos = await ContatoModel.find().sort({ criadoEm: 1 }); //busca todos os contatos filtrados pela criação na ordem crescente
    return contatos;
}
Contato.delete = async function(id){
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id}); //Procura e deleta pelo objeto de filtro
    return contato;
}

module.exports = Contato;