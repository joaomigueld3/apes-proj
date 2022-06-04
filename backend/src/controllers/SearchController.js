const Event = require('../models/Event');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { get } = require('../routes');
const User = require('../models/User');
//const { update } = require('../models/Prof');
//const { delete } = require('../routes');

module.exports = {
    async index(request, response){
//buscar profissionais pela profissão 
//filtrar pela especialização
//filtrar pelo sexo
    const { tags, location } = request.query;
    //recebe do insomnia e armazena nas consts
    const tagsArray = parseStringAsArray(tags);
        //console.log(request.query); vê o query pedido no insomnia
        //console.log(especialidadesArray); mostra as especialidades como array
        const evets = await Event.find({
            tags:{
                $in: tagsArray,
                //$in é um filtro do mongo(mongo operators)
            },
            tipo:{
                $in: tipo,
            }            
        })
        return response.json({ events });
        },

        async get(request, response){
            const {tipo}=request.params;

            const joao = await Event.findOne({tipo});
            if(!joao){
                return response.status(204).json({message: "Não existem Eventos do tipo "+tipo});
            }
            else{
                const foundEvents =await Event.find({
                    tipo:{
                        $eq:tipo,
                    }
                } );
                    
                    return response.json(foundEvents);
                
            }
            },
            
        async update(request, response){
                const { email2 }=request.params;
                
                const joao = await Event.findOne({email2});
                const joao2=Event.find();
                if(joao2){
                    console.log(joao2.name);
                }

                if(!joao){
                    console.log({message:"Não é possível modificar um evento não cadastrado!"});
                    return response.status(204).json({message:"O evento não pode ser deletado, pois ele não existe!"});
                    
                }
                else{
                    //const { nome2, email2 }=request.body;
                    const prevNome=Event.name;
                    const prevEmail=Event.email;
                    const prevProfissao=Event.tipo;

                    const updatedProf =await Event.updateOne(
                         
                        {email:request.params.email},
                        
                        {$set:{nome:request.body.name,
                            email:request.body.email,
                            profissao:request.body.tipo}}
                               
                        );/*
                        if(Prof.nome.$eq(null)){
                             updatedProf=await Prof.updateOne(
                                {email:request.params.email},
                                {$set:{nome:prevNome}}
                            );
                        }
                        if(Prof.email.$eq(null)){
                             updatedProf=await Prof.updateOne(
                                {email:request.params.email},
                                {$set:{email:prevEmail}}
                            );
                        }*/
                        
                        return response.json(updatedProf);

                }
                
            },

            async destroy(request, response){   //delete
                const {email2} = request.params;

                const joao = await Event.findOne({email2});
                
                if(!joao){
                    console.log({message:"Não é possível deletar um evento não cadastrado!"});
                    return response.status(400).json({message:"O evento não pode ser deletado, pois ele não existe!"});
                    
                }
                else{
                  const joao2 =await  Event.deleteOne({email:request.params.email});
                    
                  return response.json(joao2);
                }
                
            },
}
    