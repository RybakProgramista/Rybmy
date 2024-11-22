import config from './config.js'
import mysql from 'mysql'

const database = mysql.createConnection(config.db)
export default database