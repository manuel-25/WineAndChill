import jwt from 'jsonwebtoken'

function authorization(role) {
  return async (req, res, next) => {
    try {
      let token = null
      const authHeader = req.headers.authorization

      if (authHeader && authHeader.startsWith('Bearer')) token = authHeader.slice(7)
      if (!token) token = req.cookies.token

      if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT)
        const jwtRole = decodedToken.role

        const rolesHierarchy = ['PUBLIC', 'PREMIUM', 'OWNER']
        if (rolesHierarchy.indexOf(jwtRole) >= rolesHierarchy.indexOf(role)) {
          return next()
        } else {
          return res.status(403).json({ status: 'error', message: 'Permission denied' })
        }
      }
      return res.redirect('/login')
    } catch (err) {
      next(err);
    }
  };
}

export default authorization