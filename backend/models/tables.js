import {Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
// Model Faktur
export class Invoice extends Model {}
Invoice.init({
  invoice_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  seller_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Invoice',
  tableName: 'invoice',
  timestamps: true
});

// Model Produk
export class Product extends Model {}
Product.init({
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  harga: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'product',
  timestamps: true
});

// Model ProdukTerjual (untuk menghubungkan Faktur dan Produk)
export class ProductInvoice extends Model {}
ProductInvoice.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize,
  modelName: 'ProductInvoice',
  tableName: 'product_invoice',
  timestamps: true
});

// Definisikan relasi
Invoice.belongsToMany(Product, { through: ProductInvoice });
Product.belongsToMany(Invoice, { through: ProductInvoice });

// Sinkronisasi model dengan database
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.log('This error occurred', error);
  }
};

export { syncModels };