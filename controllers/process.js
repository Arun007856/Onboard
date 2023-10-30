const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
require('dotenv').config();
const product = require('../models/products');
const connect = require('../config/db')
const validation = require('../models/validation')



module.exports = {
    Register: async (req, res) => {
        try {
            let userValidation = await validation.registerValidation(req.body, 'Register validation')
            if (userValidation.status == "SUCCESS") {
                const { userName, email, password, role, mobileNumber } = req.body;
                const existCust = await User.findOne({ email, mobileNumber })
                if (existCust) {
                    res.status(201).json({ message: 'Account already exists', "email": email, "mobileNumber": mobileNumber });
                } else {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const user = new User({ userName, password: hashedPassword, role, email, mobileNumber });
                    await user.save().then((result) => {
                        res.status(201).json({ message: 'Registered successfully,Continue to explore our products', "username": userName, "email": email, "mobileNumber": mobileNumber });
                    });
                }
            } else {
                res.status(401).json({ "Message": "Validation error", "Error": userValidation.Message })

            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            let userValidation = await validation.registerValidation(req.body, 'Login validation')
            if (userValidation.status == "SUCCESS") {
                const { userName, password } = req.body
                const existCust = await User.findOne({ userName })
                if (existCust != null && await bcrypt.compare(password, existCust.password)) {
                    const token = jwt.sign({ userName, role: existCust.role }, process.env.secret);
                    res.status(200).json({ token });

                } else {
                    res.status(401).json({ message: 'Incorrect userName or password,please check!!' });
                }
            } else {
                res.status(401).json({ "Message": "Validation error", "Error": userValidation.Message })

            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }

    },
    products: async (req, res) => {
        try {
            const roles = req.roles
            if (roles == "user") {
                const userProducts = await product.find({}, 'name price Discount')
                res.status(401).json({ Products: userProducts });
            } else if (roles == "plus member") {
                const premimAccntProducts = await product.find({}, 'name price premiumMemberDiscount')
                res.status(401).json({ Products: premimAccntProducts });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }


    },

    addproducts: async (req, res) => {
        try {
            const roles = req.roles
            if (roles == "admin") {
                const { name, price, Discount, premiumMemberDiscount } = req.body
                const user = new product({ name, price, Discount, premiumMemberDiscount });
                await user.save().then((result) => {
                    res.status(201).json({ message: 'Product added successfully,Keep going!!', });
                });
            } else {
                res.status(401).json({ message: 'You are not allowed to enter this menu, Please check with admin team', });
            }

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    editProducts: async (req, res) => {
        try {
            const roles = req.roles
            if (roles == "admin") {
                const { id, name, price, Discount, premiumMemberDiscount } = req.body
                const user = await product.updateOne({ _id: id }, { name, price, Discount, premiumMemberDiscount })
                    .then((result) => {
                        res.status(201).json({ message: 'Product updated successfully,Keep going!!', result });
                    });
            } else {
                res.status(401).json({ message: 'You are not allowed to enter this menu, Please check with admin team', });
            }

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteProducts: async (req, res) => {
        try {
            const roles = req.roles
            if (roles == "admin") {
                const { id, name, } = req.body
                const user = await product.deleteOne({ _id: id })
                    .then((result) => {
                        res.status(201).json({ message: 'Product deleted successfully,Keep going!!', result, name });
                    });
            } else {
                res.status(401).json({ message: 'You are not allowed to enter this menu, Please check with admin team', });
            }

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }


}

