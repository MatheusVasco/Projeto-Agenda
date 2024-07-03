const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

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
        this.valida(); //valida os dados puros
        if(this.errors.length > 0) return

        await this.userExists(); //valida os dados com o banco
        if(this.errors.length > 0) return

        const salt = bcryptjs.genSaltSync()
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt)
        try {
            this.user = await LoginModel.create(this.body) //tenta criar os dados na base de dados
        } catch (e){
            console.log(e);
        }
    }

    async userExists() {
        const user = await LoginModel.findOne({ email: this.body.email})
        if(user) this.errors.push('Usuário já existe.')
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
