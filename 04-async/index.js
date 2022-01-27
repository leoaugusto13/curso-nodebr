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

// 1º passo adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
    try {
        console.time('medida-promise')
         const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterEnderecoAsync(usuario.id),
            obterTelefone(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

    console.log(`
    Nome: ${usuario.nome}
    Endereco: ${endereco.rua}, ${endereco.numero}
    Telefone: (${telefone.ddd}) ${telefone.telefone}
    `)
    console.timeEnd('medida-promise')

    } catch (error) {
        console.error('DEU RUIM', error)
    }
}