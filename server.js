const express = require('express');
const dotenv  = require('dotenv');
const sequelize = require('./database/database');
const router = require('./routes/routes');
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json())
app.use('/api', router);

(async () => {

  try {
    
    await sequelize.sync({ force: false });

    console.log("Base datos sincronizada")

    app.listen(3000, () => {
      console.log("SERVIDOR CORRIENTO EN EL PUERTO "+ 3000);
    })
    
  } catch (error) {
    console.error('error', error)
  }

})();