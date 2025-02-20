import database from '../../database.js'


export const signup = async (req, res) => {
  const { login, password } = req.query;
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  database.query('INSERT INTO `dane` (`id`, `login`, `haslo`) VALUES (NULL, ?, ?);', [login, hashedPassword], function (error, results) {
    if (error) res.json(false)
    else res.json(true)
  })
}