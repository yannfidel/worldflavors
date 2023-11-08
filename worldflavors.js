//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/worldflavors", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
  email: { type: String },
  senha: { type: String },
});

const ProdutoExotico = new mongoose.Schema({
  idProdutoExotico: { type: String },
  descricao: { type: String },
  fornecedor: { type: String },
  dataFabri: { type: String },
  estoque: { type: Number }
});

const Produto = mongoose.model("Produto", ProdutoArtificial);
const Usuario = mongoose.model("Usuario", UsuarioSchema);

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  //validação de campos

  const usuario = new Usuario({
    email: email,
    senha: senha
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.post("/cadastroproduto", async (req, res) => {
  const idProdutoExotico = req.body.idProdutoExotico;
  const descricao = req.body.descricao;
  const fornecedor = req.body.fornecedor;
  const dataFabri = req.body.dataFabri;
  const estoque = req.body.estoque;

  const produto = new Produto({
    idProdutoExotico: idProdutoExotico,
    descricao: descricao,
    fornecedor: fornecedor,
    dataFabri: dataFabri,
    estoque: estoque,
  });

  try{
    const newProduto = await produto.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newProduto._id });
  } catch (error){}
  
});

//rota de get de formulario
app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname + "/cadastrousuario.html");
});

app.get("/cadastroproduto", async (req, res) => {
  res.sendFile(__dirname + "/cadastroproduto.html");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
