const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
   
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Acceso no autorizado"
        })
    }

    const secret = process.env.JWT_SECRET;

    try {
        
        const decodificado = jwt.verify(token, secret);

        req.user = await User.findByPk(decodificado.id);
        next();
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "TOken invalido"
        })
    }

}

exports.isAdmin = async(req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({
            status: false,
            message: "Acceso denegado: se requiere privilegios de administrador"
        })
    }

    next();
}