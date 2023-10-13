import { Router } from "express";
import CartManager from "../dao/database/cartManager.js";
import publicRoutes from "../middlewares/publicRoutes.js";
import privateRoutes from "../middlewares/privateRoutes.js"


const router = Router();

res.render('chat', {});

router.get('/products', privateRoutes, async (req,res)=> {
    const products = await pm.getProducts();
    const { first_name } = req.session;
    res.render('products', { first_name, products})

});

router.get('/cart', async (req,res)=> {
    const cart = await CartManager.getAllCarts();
    res.render('cart', {cart})
});

router.get('/signup', publicRoutes, (req, res)=> {
    res.render('signup')
});

router.get('/login', publicRoutes, (req, res)=> {
    res.render('login')
});

router.get('/profile', privateRoutes, (req, res) => {
    const { first_name, last_name, role, email, age } = req.session;
    res.render('profile', { first_name, last_name, role, email, age})
});

router.get('/logout', (req,res )=> {
    req.session.destroy();
    res.redirect('/login');
});


export default router;