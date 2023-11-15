const { Product, Seller, Category, Product_Supplier, Supplier } = require('../models/index');
const Joi = require('joi');
const { handleClientError, handleServerError } = require('../helpers/errorHandler')

// ABOUT CATEGORY
const readSeller = async (req, res) => { // GET Seller
  try {
    const data = await Seller.findAll({})
    res.status(200).json({
      data: data,
      status: 'Success read all seller'
    })
  } catch (err) {
    console.log(err);
    return handleServerError(res);
  }
}

const sellerDetail = async (req, res) => { // DETAIL PRODUCT
  try {
    const { id } = req.params
    const data = await Seller.findByPk(id, {
      attributes: ["shop"],
      include: [
        {
          model: Product,
          attributes: ["name"]
        },
      ]
    })
    if (!data) return handleClientError(res, 404, 'Data Not Found');
    res.status(200).json({
      data: data,
      status: 'Success read detail seller'
    })
  } catch (err) {
    console.log(err)
    return handleServerError(res);
  }
};

const addSeller = async (req, res) => { // ADD CATEGORY
  try {
    const sellerSchema = Joi.object({
      shop: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(10000).required(),
      image: Joi.string().uri(),
      categoryId: Joi.number().required(),
      supplierName: Joi.string().required()
    });

    const { error, value } = sellerSchema.validate(req.body);

    if (error) return handleClientError(res, 400, error.details[0].message);

    const { shop, name, description, price, image, categoryId, supplierName } = value || {};

    const sameSeller = await Seller.findOne({ where: { shop } });

    if (sameSeller) return handleClientError(res, 400, 'Seller with the same name already exists.');

    const sameData = await Product.findOne({ where: { name } });

    if (sameData) return handleClientError(res, 400, 'Gk boleh jual barang yg sama');

    const createSeller = await Seller.create({ shop });
    const createProduct = await Product.create({ name, description, price, image, categoryId, sellerId: createSeller.id });

    const sameSupplier = await Supplier.findOne({ where: { name: supplierName } });
    if (sameSupplier) return handleClientError(res, 400, 'Supp LIER with the same name already exists.');

    const createSupplier = await Supplier.create({ name: supplierName })

    await Product_Supplier.create({ productId: createProduct.id , supplierId: createSupplier.id})

    res.status(201).json({
      data: { createSeller, createProduct },
      status: 'successfully added new stores and first items',
    });
  } catch (err) {
    console.error(err);
    return handleServerError(res);
  }
}

const editSeller = async (req, res) => {
  try {
    const { id } = req.params
    const sellerSchema = Joi.object({
      shop: Joi.string().required(),
    });

    const { error, value } = sellerSchema.validate(req.body);

    if (error) return handleClientError(res, 400, error.details[0].message);
    const { shop } = value;
    const sameData = await Seller.findOne({ where: { shop } });

    if (sameData) return handleClientError(res, 400, 'Store with the same name already exists.');
    await Seller.update({ shop }, {
      where: { id: id },
      returning: true
    })

    const data = await Seller.findOne({ where: { id: id } });
    res.status(201).json({
      data: data,
      status: 'Success edit seller/Store',
    });
  } catch (err) {
    console.log(err);
    return handleServerError(res);
  }
}

const deleteSeller = async (req, res) => {
  try {
    const { id } = req.params
    const findSeller = await Seller.findByPk(id);

    if (!findSeller) return handleClientError(res, 404, 'Data Not Found');

    const destroy = await Seller.destroy({
      where: { id },
    });
    if (destroy) await Product.destroy({ where: { sellerId: id } })
    res.status(200).json({
      status: `Store with id ${id} and his product has been deleted`,
    });
  } catch (err) {
    console.log(err);
    return handleServerError(res);
  }
}


module.exports = {
  readSeller,
  sellerDetail,
  addSeller,
  editSeller,
  deleteSeller
};