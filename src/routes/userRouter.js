import { Router } from "express";
import userModel from '../dao/models/user.model.js'

const router = Router();

router.post('/signup', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        let role = 'user';

        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            role = "admin";
        }

        const userFind = await userModel.findOne({ email });

        if (userFind) {
            return res.send('You are already sign in')
        }

        const user = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password,
        });
        req.session.first_name = user.first_name;
        req.session.last_name = user.last_name;
        req.session.email = user.email;
        req.session.age = user.age;
        req.session.isLogged = true;

        res.redirect('/profile')

    } catch (error) {
        res.status(500).send("Error on user registration", error)
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password }).lean();
        if (!user) {
            return res.send('Incorrect password or email')
        }
        req.session.first_name = user.first_name;
        req.session.last_name = user.last_name;
        req.session.email = user.email;
        req.session.age = user.age;
        req.session.role = user.role;
        req.session.isLogged = true;

        res.redirect('/products')
    } catch (error) {
        res.status(500).send("Login error", error)
    };
});

export default router;