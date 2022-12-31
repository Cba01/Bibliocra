import user from "../models/user";
import Venta from "../models/venta";

const comprar = async function(req, res){
    const user = req.session.user
    var data = req.body
    data.usuario = user.id

    await Venta.create(data);

    req.flash('message', 'Compra realizada con exito')
    res.status(200).send({ok: true});
}

const render = async function(req, res){
    const ventas = await Venta.find().populate({path:'usuario', select: [
        'nombre',
        'apellido',
        'usuario',
        'correo',
        'direccion',
        'telefono'
    ]})
    
    res.send(ventas)
}

const editarEstado = async function(req, res){
    const data = req.body

    await Venta.findOneAndUpdate({_id: data.id}, {estado: data.estado});

    res.status(200).send({ok: true})
}

module.exports = {
    comprar,
    render,
    editarEstado
}