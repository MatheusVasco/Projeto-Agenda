exports.paginaInicial = (req, res) => {
    res.render('index',{
        titulo : 'Este é o titlo da página',
        numeros: [0,1,2,3,4,5,6,7,8,9]
    });
}

exports.trataPost = (req, res) => {
    res.send(`
        Olá, ${req.body.name}, como você vai?
    `)
}