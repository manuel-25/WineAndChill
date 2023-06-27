function auth(req, res, next) {
  if (req.session?.role) {
    return next()
  } else {
    return res.status(401).json({
      success: false,
      message: 'You must be logged in',
    })
  }
}

export default auth