const { Product, Seller, Category, Product_Supplier, Supplier } = require('../models/index');
const Joi = require('joi');
const { handleClientError, handleServerError } = require('../helpers/errorHandler')

// ABOUT CATEGORY
const readCategory = async (req, res) => { // GET CATEGORY
  try {
    const data = await Category.findAll({})
    res.status(200).json({
      data: data,
      status: 'Success read all category'
    })
  } catch (err) {
    console.log(err);
    return handleServerError(res);
  }
}

const addCategory = async (req, res) => { // ADD CATEGORY
  try {
    const categorySchema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = categorySchema.validate(req.body);

    if (error) return handleClientError(res, 400, error.details[0].message);
    const { name } = value || {};
    const existingCategory = await Category.findOne({ where: { name } });

    if (existingCategory) return handleClientError(res, 400, 'Category with the same name already exists.');

    const createdCategory = await Category.create({ name });

    res.status(201).json({
      data: createdCategory,
      status: 'Success add category',
    });
  } catch (err) {
    console.error(err);
    return handleServerError(res);
  }
}

const editCategory = async (req, res) => {
  try {
    const { id } = req.params
    const categorySchema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = categorySchema.validate(req.body);

    if (error) return handleClientError(res, 400, error.details[0].message);
    const { name } = value;
    const sameData = await Category.findOne({ where: { name } });

    if (sameData) return handleClientError(res, 400, 'Category with the same name already exists.');
    await Category.update({ name }, {
      where: { id: id },
      returning: true
    })

    const data = await Category.findOne({ where: { id: id } });
    res.status(201).json({
      data: data,
      status: 'Success Edit category',
    });
  } catch (err) {
    console.log(err);
    return handleServerError(res);
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const findCategory = await Category.findByPk(id);

    if (!findCategory) return handleClientError(res, 404, 'Data Not Found');

    const destroy = await Category.destroy({
      where: { id },
    });
    if (destroy) await Product.destroy({ where: { categoryId: id } })
    res.status(200).json({
      status: `Category with id ${id} has been deleted`,
    });
  } catch (err) {
    console.log(err);
    return handleServerError(res);
  }
}


module.exports = {
  readCategory,
  addCategory,
  editCategory,
  deleteCategory
};