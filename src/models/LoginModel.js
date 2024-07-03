const mongoose = require('mongoose');
const validator = require('validator');

//Tratamento dos dados na memoria para enviar para o banco de dados
const LoginSchema = new mongoose.Schema({
    email: {type : String, required: true},
    senha: {type : String, required: true},
});

const LoginModel = mongoose.model('Login', LoginSchema); //envia o dado em memoria para o banco de dados

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){ 
        this.valida();
        if(this.errors.length > 0) return

        try {
            this.user = await LoginModel.create(this.body) //tenta criar os dados na base de dados
        } catch (e){
            console.log(e);
        }
    }

    valida(){
        this.cleanUp(); //Limpar o objeto
        //Validação
        //O e-mail precisa ser valido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        //A senha precisa ter entre 3 e 50
        if(this.body.senha.length < 3 ||this.body.senha.length > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres')
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] != "string") {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
    }
}

module.exports = Login;
