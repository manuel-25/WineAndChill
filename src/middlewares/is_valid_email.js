export default function(req, res, next) {
    const email = req.body.email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (emailRegex.test(email)) {
        next()
    } else {
        res.status(400).json({ error: 'Invalid email' })
    }
}

