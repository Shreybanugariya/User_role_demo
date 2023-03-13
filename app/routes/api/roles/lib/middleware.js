const middleware = {};

middleware.createRole = async (req, res, next) => {
    const { sRoleName, aAccessModules, bActive } = req.body;
    if (!sRoleName) res.reply(message.required_field('sRoleName'))
    if (!aAccessModules) res.reply(message.required_field('aAccessModules'))
    if (!bActive) res.reply(message.required_field('bActive'))
    next();
}

module.exports = middleware;