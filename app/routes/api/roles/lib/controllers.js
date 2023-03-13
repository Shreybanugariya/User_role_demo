const { Role } = require('../../../../models');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const controllers = {}

controllers.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find()
        if (roles) return res.reply(message.success(), roles)
        return res.reply(message.no_prefix('There was an error finding the roles'))
    } catch (err) {
        console.log(err)
    }
}

controllers.getRole = async (req, res) => {
    const { id } = req.params;
    const role = await Role.findOne({ _id: id }).lean()
    if (role) return res.reply(message.success(), role);
    return res.reply(message.no_prefix('There was an error finding this role'))
}

controllers.createRole = async (req, res) => {
    try {
        const { sRoleName, aAccessModules, bActive } = req.body;
        const existingRole = await Role.findOne({ sRoleName }).lean()
        if (existingRole) return res.reply(message.no_prefix('The role already exist'))
        const newRole = await Role.create({ sRoleName, aAccessModules, bActive, dCreatedAt: Date.now() })
        if (newRole) return res.reply(message.success('Role Creation'), newRole);
        return res.reply(message.no_prefix('There was an error creating new role'))
    } catch (err) {
        console.log(err)
        return res.json(err);
    }
}

controllers.deleteRole = async (req, res) => {
    const { id } = req.params;
    const users = await User.deleteOne({ _id: id }).lean()
    if (users) return res.reply(message.success('Delete User'));
    return res.reply(message.no_prefix('There was an error deleting role'))
}   

controllers.updateAccessModule = async (req, res) => {
    const { id } = req.params;
    const { aAccessModules } = req.body
    const role = await Role.findByIdAndUpdate(id, { $addToSet: { aAccessModules }}, { new: true });
    if (!role) return res.reply(message.no_prefix('Cannot find the role'))
    return res.reply(message.success('Access Module Update'), role);
}

module.exports = controllers;