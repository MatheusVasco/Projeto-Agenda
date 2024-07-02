exports.middlewareGlobal = (req, res, next) => {

    // if(req.body.cliente) {
    //     req.body.cliente = req.body.cliente.replace('Miranda', 'NÃO USE MIRANDA')
    //     console.log(`Vi que você postou ${req.body.cliente}`);
    // }
    res.locals.umaVariavelLocal = "Este é o valor da variavel local"

    // console.log("OI");
    next();
}
exports.outroMiddleware = (req, res, next) => {

    console.log("Outro middleware");
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === "EBADCSRFTOKEN") {
        console.log("Passei aqui 12121");
        return res.render('404')
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}