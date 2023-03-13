const middleware = {};
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

middleware.createUser = async (req, res, next) => {
    const { sFullName, sEmail, sMobile, sPassword, sUserName, sProfileUrl, eGender } = req.body;
    if (!sFullName) res.reply(message.required_field('sFullName'))
    if (!sEmail) res.reply(message.required_field('sFullName'))
    if (!sMobile) res.reply(message.required_field('sFullName'))
    if (!sUserName) res.reply(message.required_field('sFullName'))
    if (!sProfileUrl) res.reply(message.required_field('sFullName'))
    if (!eGender) res.reply(message.required_field('sFullName'))
    next();
}

middleware.checkId = async (req, res, next) => {
    const { id } = req.params;
    const isValidMongoId = (id) => {
        return ObjectId.isValid(id)
    }
    if ((!id || !req.params) && !isValidMongoId(id)) res.reply(message.required_field('Id'))
    next();
}

module.exports = middleware;