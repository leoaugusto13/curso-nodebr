/*
    0.Obter um usuário
    1.Obter o telefone de um usuário a partir de seu Id
    2.Obter o endereço de um usuário pelo seu Id
*/

function obterUsuario(callback){

    setTimeout(function () {
        return  callback (null, {
            id: 1,
            nome: 'Alladin',
            dataNascimento:  new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
    setTimeout(() =>{
        return  callback(null, {
            telefone: '11999002', 
            ddd: 11
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos idiotas',
            numero: 169
        })
    }, 2000);
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario){
    //null || "" || 0 === false
    
    if(error) {
        console.error('DEU RUIM em USUARIO', error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1) {
            console.error1('DEU RUIM em TELEFONE', error1)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
            if(error2) {
                console.error2('DEU RUIM em ENDEREÇO', error2)
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })
    })
})
//const telefone = obterTelefone(usuario.id)


//console.log('telefone', telefone)