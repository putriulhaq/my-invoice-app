import express from 'express'
import { Product} from '../models/tables.js'
import sequelize from '../db.js';

const routerProduct = express.Router()

routerProduct.get('', async(req, res) => {
    try {
        const products = await Product.findAll()
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching products', error: error.message });

    }
})

export default routerProduct