exports.getSignUp = (req, res, next) => {
    res.status(200).render('register/signUp', {
        pageTitle: 'Sign up'
    })
}