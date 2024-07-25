import express from 'express'
import { Invoice, ProductInvoice} from '../models/tables.js'
import sequelize from '../db.js';

const invoiceRouter = express.Router();


invoiceRouter.post('/invoice', async(req, res) => {
    const t = await sequelize.transaction()
    try {
        const { date, customer_name, seller_name, description, product } = req.body;
        const invoice = await Invoice.create({
            date,
            customer_name,
            seller_name,
            description
          }, { transaction: t });

          for (const item of product){
            console.log(item)
            await ProductInvoice.create({
                jumlah: item.jumlah,
                createdAt: new Date(),
                updatedAt: new Date(),
                InvoiceInvoiceId: invoice.invoice_id,
                ProductProductId: item.product_id
            }, { transaction: t });
          }
          await t.commit();
          res.status(201).json({ message: 'Invoice created successfully', invoiceId: invoice.invoice_id });

    } catch (error) {
        await t.rollback();
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: 'Error creating invoice', error: error.message });
      }

})

export default invoiceRouter