import User from "../models/user";

const renderUsers = async function(req, res){
    const users = await User.find();

    res.status(200).send(users)
}

const searchUser = async function(req, res){
    const data = req.body.nombre;
    
    const users = await User.find({nombre: data});

    res.status(200).send(users)
}

const addUser = async function(req, res){
    const user = User(req.body);
  
    const userSaved = await user.save();
  
    console.log(userSaved);
    res.redirect("/admin/users");
}

const deleteUser = async function(req, res){
    var {id} = req.params;

    console.log(id)
    
    await User.remove({_id: id});

    res.redirect("/admin/users")
}

module.exports = {
    renderUsers,
    addUser,
    deleteUser,
    searchUser
}