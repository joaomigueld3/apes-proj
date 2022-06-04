const mongoose = require('mongoose');
const PointSchema = require("./utils/PointSchema");

const EventSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true        
    },
    tipo: {
        type: String,
        required: true,
        enum: ["Infantil", "Festa/Balada", "Cultural"]
    },    
    event_url: String,
    img_url: String,
    tags: [String],
    bio: String,
    location:{
        type: PointSchema,
        index: "2dsphere"
    }
    //dataNascimento: 
    //link CONFEF/CFN/CRP(válido)
    //receber curriculo (txt e pdf)
    //receber imagem
  
});

    module.exports = mongoose.model('Event', EventSchema);