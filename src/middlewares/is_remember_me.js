export default (req, res, next) => {
    const rememberMe = req.query.rememberMe === 'true'
    if (rememberMe) req.body.rememberMe = rememberMe
    console.log('es true?', rememberMe)
    next()
}