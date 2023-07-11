function isAuthenticated(req, res, next) {
  if (req.session.email) {
    return next()
  } else {
    return res.status(403
      ).json({
      success: false,
      message: 'You must be logged in',
    })
  }
}

export default isAuthenticated