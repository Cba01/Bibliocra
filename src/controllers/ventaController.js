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
    const ventas = await Venta.find()
    console.log(ventas)
    res.send(ventas)
}

module.exports = {
    comprar,
    render
}