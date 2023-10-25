const Sequelize = require('sequelize')
const Member = require('./member')
const Room = require('./room')
const env = process.env.NODE_ENV|| 'development'
const config = require('../config/config.json')[env] //개발용 db 사용
const Chat = require('./chat')

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db ={} //app 에 붙여서 사용 app(model, sequelize - db연결정보)
db.sequelize=sequelize

db.Member = Member
db.Room = Room
db.Chat = Chat


Member.init(sequelize)
Room.init(sequelize)
Chat.init(sequelize)

Member.associate(db)
Room.associate(db) 
Chat.associate(db)


module.exports =db