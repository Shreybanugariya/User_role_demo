const mongoose = require('mongoose')
const { mongodb } = require('../../utils/lib/mongodb')

const Role = new mongoose.Schema({
    sRoleName: { type: String },
    aAccessModules: [String],
    dCreatedAt: { type: String },
    bActive: { type: Boolean },  
})

module.exports = mongodb.model('roles', Role)