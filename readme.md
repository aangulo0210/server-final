const express = require("express");
//const path = require("path"); Para mostrar la pagina en el servidor
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/validar",(req,res)=>{
  console.log(req.body.reContra);    
  const {reEmail, reContra} = req.body;
  console.log("info: ",{reEmail, reContra});
  res.status(200).json({reEmail, reContra});
  // if(reEmail = usuEmail){
  // }
});

//app.use(express.static("../public")); para mostrar la página en el servidor

//Para que la página se muestre apenas inicie el servidor en el navegador
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
//   });

app.listen(PORT, function () {
  console.log(`El servidor es localhost:${PORT}`);
});
