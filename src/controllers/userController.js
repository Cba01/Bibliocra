import User from "../models/user";
var bcrypt = require('bcrypt-nodejs');

const login = async function(req, res){
    var usuario = req.body.usuario;
    var pass = req.body.password;

    const user = await User.find({usuario: usuario});

    if(user[0].length != 0){
        bcrypt.compare(pass, user[0].password, function(error, check){
            if(check){
                var rol = user[0].rol;
                req.session.user = {usuario: usuario, rol: rol}
                res.redirect('/admin/')
            }else{
                res.status(400).send({error: "password incorrecta"})
            }
        })
    }else{
        res.status(400).send({error: "Usuario incorrecto"});
    }
}

const addUser = async function(req, res){
    var session = req.session.user;
    var data = req.body;
    var usuario_arr = [];

    usuario_arr = await User.find({usuario: data.usuario});

    if(usuario_arr.length == 0){
        if(data.password){
            bcrypt.hash(data.password, null, null, async function(err, hash){
                if(hash){
                    data.password = hash;

                    var reg = await User.create(data);
                    if(session){
                        res.redirect("/admin/users");
                    }else{
                        res.redirect("/login");
                    }
                }else{
                    res.status(200).send({error: 'Error servidor'});
                }
            })
        }else{
            res.status(200).send({error: 'No se ingreso ninguna password'});
        }
    }else{
        res.status(200).send({error: 'El correo ya esta registrado'});
    }
}

const logout = async function(req, res){
    req.session.user = null;

    res.redirect('/');
}

const renderUsers = async function(req, res){
    const users = await User.find();

    res.status(200).send(users)
}

//funcion no terminada
const searchUser = async function(req, res){
    const data = req.body.nombre;
    
    const users = await User.find({nombre: data});

    res.status(200).send(users)
}

const deleteUser = async function(req, res){
    var {id} = req.params;

    console.log(id)
    
    await User.remove({_id: id});

    res.redirect("/admin/users")
}

module.exports = {
    login,
    logout,
    renderUsers,
    addUser,
    deleteUser,
    searchUser
}