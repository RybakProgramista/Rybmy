import database from '../../database.js'


export const signup = (req, res) => {
  const { login, password } = req.query;

  database.query('INSERT INTO `dane` (`id`, `login`, `haslo`) VALUES (NULL, ?, ?);', [login, password], function (error, results) {
    if (error) res.json(false)
    else res.json(true)
  })
}