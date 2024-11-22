import config from '../../config.js'
import mysql from 'mysql'

export const database = mysql.createConnection(config.db)