const { User, Role } = require('../../../../models')

const controllers = {}

controllers.createUser = async (req, res) => {
    const body = _.pick(req.body, ['sFullName', 'sEmail', 'sMobile', 'sPassword', 'sUserName', 'sProfileUrl', 'eGender', 'iRoleID']);
    try {
        const existingUser = await User.findOne({$or: [{ sEmail: body.sEmail },{ sUserName: body.sUserName }]})
        if (existingUser) return res.reply(message.custom.already_exists())
        const user = await User.create(body);
        if (user) return res.reply(message.success(), user);
        return res.reply(message.no_prefix('There was an error creating user'))
    } catch (error) {
        console.log(error)
    }
}

controllers.getAllUsers = async (req, res) => {
    const { searchValue, limit, offset } = req.body;
    const users = await User.find({$or: [{ sFullName: new RegExp(searchValue) }, { sUserName: new RegExp(searchValue) }, { sEmail: new RegExp(searchValue) } ]}).lean()
    if (users.length) return res.reply(message.success(), users);
    return res.reply(message.no_prefix('There was an error finding users'))
}

controllers.getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).populate({
        path: 'iRoleID',
        select: 'sRoleName aAccessModules',
    })
    if (user) return res.reply(message.success(), user);
    return res.reply(message.no_prefix('There was an error finding users'))
}

controllers.deleteUser = async (req, res) => {
   try {
        const { id } = req.params;
        const users = await User.deleteOne({ _id: id }).lean()
        if (users) return res.reply(message.success('Delete User'));
        return res.reply(message.no_prefix('There was an error deleting user'))
   } catch (err) {
        console.log(err)
        return res.send(err)
   }
}

controllers.checkAccess = async (req, res) => {
    try {
        const { id } = req.params;
        const { accessModule } = req.body;
        const user = await User.findById(id).populate('iRoleId')
        if (!user.iRoleID) return res.send({ hasAccess: false });
        const iRoleId = user.iRoleID;
        const role = Role.findById(iRoleId);
        if (role.aAccessModules.includes(accessModule)) return res.send({ hasAccess: true });
        return res.send({ hasAccess: false})
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

controllers.bulkUpdate = async (req, res) => {
    const { field, value } = req.body;
    const user = await User.updateMany({}, { $set: { [field]: value }})
    if (user) return res.reply(message.success('User Bulk Update'))
    return res.reply(message.no_prefix('There was an error bulk updating users'))
}

controllers.updateMultiple = async (req, res) => {
    const updateArray = req.body
    const bulkOperations = updateArray.map(update => {
        const { userId, ...rest } = update;
    
        return {
          updateOne: {
            filter: { _id: userId },
            update: { $set: rest }
          }
        };
      });
    User.bulkWrite(bulkOperations).then(() => res.reply(message.success('User Bulk Update')))
    .catch((err) => res.reply(message.no_prefix('There was an error'), err))
}

controllers.singIn = async (req, res) => {
    const user = await User.findOne({ sEmail: email, sPassword: password }).lean();
    if (user) return res.reply(message.success('Welcome'))
    return res.reply(message.wrong_credentials())   
}

module.exports = controllers