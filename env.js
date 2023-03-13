const env = process.env.NODE_ENV || 'dev'

const oEnv = {}

oEnv.dev = {
    DB_URL: 'mongodb+srv://shrey:EDqdXR6QZOgGOzdT@cluster0.nwzvogp.mongodb.net/test',
}

process.env.DB_URL = oEnv[env].DB_URL
process.env.PORT = 3000