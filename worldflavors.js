//configurando o banco de dados
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017/dbworldflavors", {  useNewUrlParser: true,  useUnifiedTopology: true,});




//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
      nome: { type: String },
      email: { type: String, required: true },  
      endereco: { type: String },  
      numero: { type: Number },  
      cep: { type: String, required: true }, 
      nascimento: { type: Date, required: true },});

      const produtoexotico = new mongoose.Schema({
        id_produtoexotico: { type : String},
        Descricao :  {type : String},
        Fornecedor : {type : String},
        DataFabricacao : {type : Date},
        QuantidadeEstoque : {type : Number},
    })
  
        const Usuario = mongoose.model("Usuario", UsuarioSchema);





        app.post("/cadastrousuario", async (req, res) => {
            const nome = req.body.nome;
            const email = req.body.email;
            const endereco = req.body.endereco;
            const numero = req.body.numero;
            const cep = req.body.cep;
            const nascimento = req.body.nascimento;
          
            const usuario = new Usuario({
              nome: nome,
              email: email,
              endereco: endereco,
              numero: numero,
              cep: cep,
              nascimento: nascimento,
            });
          
            try {
              const newUsuario = await usuario.save();
              res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
            } catch (error) {}
          });
          
          app.get("/", async()=>{
              res.sendFile(__dirname + "/index.html")
          });
          
          app.listen(port, ()=>{
              console.log(`Servidor rodanda na porta ${port}`)
          });