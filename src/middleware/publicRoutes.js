const publicRoutes = (req, res, next) => {
    if(req.session.isLogged) {
        return res.redirect('/profle')
      }
    next();
};

export default publicRoutes;