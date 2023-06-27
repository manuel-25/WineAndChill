function auth(req, res, next) {
  console.log(req.session?.role)
  if (req.session?.role === 0 || req.session?.role === 1) {
    return next()
  } else {
    return res.status(401).json({
      success: false,
      message: 'You must be logged in',
    })
  }
}

export default auth