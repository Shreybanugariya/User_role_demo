const mongoose = require('mongoose')
const { mongodb } = require('../../utils/lib/mongodb')

const User = new mongoose.Schema({
    sFullName: { type: String },
    sEmail: { type: String },
    sMobile: { type: String },
    sPassword: { type: String },
    sUserName: { type: String },
    sProfileUrl: { type: String },
    eGender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    iRoleID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }]
})

module.exports = mongodb.model('users', User)