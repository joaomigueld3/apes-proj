const Event = require('../models/Event'); //como tava tudo dentro da models eu iniciava a procura lá, agora ta tudo em src: ;
const parseStringAsArray = require('../utils/parseStringAsArray');
const axios = require('axios');
const cheerio = require('cheerio');
const scrapers = require('../utils/scrapers');
// index: listar, show: mostrar um único, store: criar um dev
// update: editar, destroy: deletar


module.exports = {

    async index(request, response){
        const event = await Event.find();
        
        return response.json(event);
    },

async store(request, response) {        //async deixou de ser uma arrow function e firou uma name (store) function


    const{ name, email, tipo, event_url, img_url, bio, tags} = request.body;
    //console.log(request.body);

    const danyel  = await Event.findOne({email}); // eu poderia usar let prof, pois let pode ser sobreposta
    if(!danyel){
        const tagsArray = parseStringAsArray(tags); 

    //const especialidadesArray = especialidades.split(',').map(tech => tech.trim());
    //map percorre um array e faz algo, nesse caso o trim(), que remove espaçoes antes e depois da string      

     const event = await Event.create({
        name,
        email,
        tipo,
        event_url,
        img_url,
        bio,        
        tags: tagsArray,
    })
   //console.log(request.body);
    return response.json(event);
    //json retorna um objeto, nesse caso uma message^
    } /**fim if */
    else{
        mensagem = "ERRO, email já cadastrado!",
        console.log(mensagem);
        return response.json({message:"email já cadastrado!"});
    }
}
};