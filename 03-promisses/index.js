/*
    0.Obter um usuário
    1.Obter o telefone de um usuário a partir de seu Id
    2.Obter o endereço de um usuário pelo seu Id
*/

//Importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    // quando der algum problema - > reject (ERRO)
    // quando sucess -> RESOLV
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return  resolve ({
                id: 1,
                nome: 'Alladin',
                dataNascimento:  new Date()
            })
        }, 1000)
    })

}

function obterTelefone(idUsuario){
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() =>{
            return resolve ({
                telefone: '11999002', 
                ddd: 11
            })
        }, 2000);
    })
 
}

function obterEndereco(idUsuario, callback){
          setTimeout(() => {
            return callback(null, {
                rua: 'dos idiotas',
                numero: 169
            })
        }, 2000);
   
}

const usuarioPromise = obterUsuario()
// para manipular o sucesso usamos a função .then
// para manipular erros, usamos o .catch
// usuario -> telefone -> telefone
usuarioPromise
.then(function(usuario){
    return obterTelefone(usuario.id)
    .then(function resolverTelefone(result){
        return {
            usuario: {
                nome: usuario.nome,
                id: usuario.id
            },
            telefone: result
        }
    })
})
.then(function (resultado){
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
        return {
            usuario: resultado.usuario,
            telefone: resultado.telefone,
            endereco: result
        }
    })
})
.then(function(resultado){
    console.log(`
    Nome: ${resultado.usuario.nome}
    Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
    Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `)
})
.catch(function (error){
    console.error('DEU RUIM', error)
})

