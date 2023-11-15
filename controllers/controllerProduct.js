const { Product, Seller, Category, Product_Supplier, Supplier } = require('../models/index');
const Joi = require('joi');
const { handleClientError, handleServerError } = require('../helpers/errorHandler')

// ABOUT PRODUCT
const readProduct = async (req, res) => { // GET ALL PRODUCT
  try {
    const data = await Product.findAll({
      order: [['id', 'ASC']],
      attributes: ["name", "description", "image", "price"],
      include: [
        {
          model: Category,
          attributes: ["name"]
        }
      ]
    })
    res.status(200).json({
      data: data,
      status: 'Success read all product'
    })
  } catch (err) {
    console.log(err);
    return handleServerError(res);
  }
}

const productDetail = async (req, res) => { // DETAIL PRODUCT
  try {
    const { id } = req.params
    const data = await Product.findByPk(id, {
      attributes: ["name", "description", "image", "price"],
      include: [
        {
          model: Category,
          attributes: ["name"]
        },
        {
          model: Product_Supplier,
          attributes: ["supplierId"],
          include: [
            {
              model: Supplier,
            }
          ]
        },
      ]
    })
    if (!data) return handleClientError(res, 404, 'Data Not Found');
    res.status(200).json({
      data: data,
      status: 'Success read detail product'
    })
  } catch (err) {
    console.log(err)

return handleServerError(res);  }
};


const addProduct = async (req, res) => { // ADD PRODUCT
  try {
    const productSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(10000).required(),
      image: Joi.string().uri(),
      categoryId: Joi.number().required(),
      sellerId: Joi.number().required(),
    });
    const { error, value } = productSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });
    const { name, description, price, image, categoryId, sellerId } = value;
    const sameData = await Product.findOne({ where: { name } });

    if (sameData) return handleClientError(res, 400, 'Gk boleh jual barang yg sama');
    const create = await Product.create({ name, description, price, image, categoryId, sellerId });

    res.status(201).json({
      data: create,
      status: 'Success Add product',
    });

    // const data = await Product.findAll({})
    // res.status(201).json({
    //   data: data,
    //   status: 'Success Add product',
    // });
  } catch (err) {
    console.error(err);
  }
};

const editProduct = async (req, res) => { // EDIT PRODUCT
  try {
    const { id } = req.params;
    const findProduct = await Product.findByPk(id);
    if (!findProduct) return handleClientError(res, 404, 'Data Not Found');
    const productSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(10000).required(),
      image: Joi.string().uri(),
      categoryId: Joi.number().required(),
      sellerId: Joi.number().required(),
    });
    const { error, value } = productSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });
    const { name, description, price, image, categoryId, sellerId } = value;
    const sameData = await Product.findOne({ where: { name } });

    if (sameData) return handleClientError(res, 400, 'DIBILANG GK BOLEH JUAL BARANG YG SAMA');
    const data = await Product.update({ name, description, price, image, categoryId, sellerId }, {
      where: { id: id },
      returning: true
    })
    res.status(201).json({
      data: data,
      status: 'Success Edit product',
    });
  } catch (err) {
    console.log(err);
    return handleServerError(res);
  }
}

const deleteProduct = async (req, res) => { // DELETE PRODUCT
  try {
    const { id } = req.params
    const findProduct = await Product.findByPk(id);

    if (!findProduct) return handleClientError(res, 404, 'Data Not Found');
    await Product.destroy({
      where: { id },
    });
    res.status(200).json({
      message: `Product with id ${id} has been deleted`,
    });
  } catch (error) {
    console.log(err);
    return handleServerError(res);
  }
}

module.exports = {
  readProduct,
  productDetail,
  addProduct,
  editProduct,
  deleteProduct,
};