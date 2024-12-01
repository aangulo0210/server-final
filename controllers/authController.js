const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const generateToken = (user) => {
    const tokenPass = process.env.JWT_SECRET
    const expires   = process.env.JWT_EXPIRATION
    return jwt.sign( { id: user.id, role: user.role }, tokenPass, {
        expiresIn: expires
    })
}

exports.login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: false,
      message: "Alguno de los campos hace falta",
    });
  }

  try {

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(400).json({
        status: false,
        message: "el usuario no fue encontrado",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if ( !isPasswordValid ) {
        res.status(400).json({
            status: false,
            message: "El email o la contraseña no son validos",
        });
    }

    const token = generateToken(user);
    res.status(200).json({
        status: true,
        message: "Bienvenido "+ user.name,
        token,
    })

  } catch (error) {
    res.status(404).json({
        status: false,
        message: "intentalo màs tarde" + error,
    });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400).json({
      status: false,
      message: "Alguno de los campos hace falta",
    });
  }

  if (role !== "admin" && role !== "user") {
    res.status(400).json({
      status: false,
      message: "Rol invalido!!!",
    });
  }

  if (password.length < 8) {
    res.status(400).json({
      status: false,
      message: "la contraseña debe tener como minimo 8 caracteres",
    });
  }

  try {
    const passwordEncript = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: passwordEncript,
      role,
    });
    res.status(200).json({
      status: true,
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "intentalo màs tarde" + error,
    });
  }
};
