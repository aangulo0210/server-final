const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");


exports.getAllUsers = async (req, res) =>{

    try {
        const users = await User.findAll();
        res.status(200).json({
            status: true,
            message: "Lista de usuarios",
            users
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Ocurrio un error en el servidor"+ error
        })
    }

}

exports.updateUser = async (req, res) => {

  const { id } = req.params;
  const { name, email, role, password } = req.body;

  if (!id) {
    res.status(400).json({
      status: false,
      message: "no se encuentra el usuario",
    });
  }

  try {

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({
        status: false,
        message: "el usuario no fue encontrado",
      });
    }

  
    user.name   = name  || user.name
    user.email  = email || user.email
    user.role   = role  || user.role

    if (password) {
      const iguales = await bcrypt.compare(password, user.password)
      if ( iguales ) {
        user.save();
        res.status(202).json({
            status: true,
            message: "La contraseña es igual que la anterior"
        })
      }else{
        const passwordEncript = await bcrypt.hash(password, 10);
        user.password = passwordEncript;
      }
    }

    await user.save();

    res.status(203).json({
        status: true,
        message: "se ha actualizado correctamente el usuario "+ id
    })

  } catch (error) {
    res.status(404).json({
        status: false,
        message: "intentalo màs tarde" + error,
    });
  }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      res.status(400).json({
        status: false,
        message: "no se encuentra el usuario",
      });
    }

  try {
    const user = await User.findByPk(id);

    if (!user) {
        res.status(400).json({
            status: false,
            message: "no se encuentra el usuario",
        });
    }

    await user.destroy();

    res.status(200).json({
      status: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "intentalo màs tarde" + error,
    });
  }
};
