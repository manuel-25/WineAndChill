import jwt from 'jsonwebtoken'

// Middleware de autorización que verifica si un usuario tiene el rol necesario para acceder a una ruta protegida
function authorization(role) {
  return async (req, res, next) => {
    try {
      let token = null

      // Verifica si hay token
      const authHeader = req.headers.authorization
      if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.slice(7)
      }
      if (!token) {
        token = req.cookies.token
      }

      if (token) {
        // Decodificar el token y obtener el role
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT)
        const jwtRole = decodedToken.role

        const rolesHierarchy = ['PUBLIC', 'PREMIUM', 'OWNER']

        // Verifica el rol
        if (rolesHierarchy.indexOf(jwtRole) >= rolesHierarchy.indexOf(role)) {
          // Éxito: puede continuar
          return next()
        } else {
          if (req.originalUrl.startsWith('/api')) {
            // Sin exito: Respuesta de API
            return res.status(403).json({ status: 'error', message: 'Permission denied' })
          } else {
            // Sin exito: debe loggearse
            const returnUrl = req.originalUrl
            const loginUrl = `/login?returnTo=${encodeURIComponent(returnUrl)}`
            return res.redirect(loginUrl)
          }
        }
      }

      // Si no se proporciona ningun token
      if (req.originalUrl.startsWith('/api')) {
        // Respuesta de API sin token
        return res.status(403).json({ status: 'error', message: 'Authentication required' })
      } else {
        // Redirigir a la página de inicio de sesión para usuarios sin token
        const returnUrl = req.originalUrl
        const loginUrl = `/login?returnTo=${encodeURIComponent(returnUrl)}`
        return res.redirect(loginUrl)
      }
    } catch (err) {
      next(err)
    }
  }
}

export default authorization
