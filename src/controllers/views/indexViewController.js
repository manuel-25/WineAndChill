const indexViewController = (req, res, next) => {
    try {
        return res.render('index', {
            title: 'Home',
            style: 'index.css'
        })
    } catch (error) {
      next(error)
    }
}

export default indexViewController