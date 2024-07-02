const path =  require('path'); 

module.exports ={ 
    // mode: 'development', // desenvolvimento gera o arquivo mais rápido
    mode: 'production', // production reduz o arquivo bundle para só uma linha e caso tenha sourceMapping para ser lançado em produção remove também todos os comentarios
    entry: './frontend/main.js', // arquivo de copia
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'), // caminho do arquivo que receberá as atualizações.
        filename: 'bundle.js' // nome do arquivo que será criado/alterado
    },
    module: {
        rules: [{
            exclude: /node_modules/, //exclui a pasta node_modules da analise do webpack para não deixar o sistema lento
            test: /\.js$/, //testar o arquivo js
            use: {
                loader: 'babel-loader', // o loader será o babel-loader
                options: {
                    presets: ['@babel/env'] // um dos presets é @babel/env
                }
            }
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map' //mapeia o erro no arquivo original caso dê erro no arquivo de saída (remover ao subir o projeto para produção)
}


//deve-se criar os fontes de desenvolvimento na pasta src e em public ficará os arquivos do site apenas

//instalando o style-loader e css-loader no terminal:
