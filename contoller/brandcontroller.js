const brand = require("../model/brandSchema")
const flash = require("express-flash")
const mongoose = require("mongoose")

module.exports = {

    getAddBrand: (req, res) => {

        res.render("./admin/addBrand", { messages: req.flash() })
        console.log('..........................this is getAddBrand......')
    },
    addBrand: async (req, res) => {

        try {
            const name = req.body.name;
            const brands = await brand.findOne({ name: name })
            if (brands) {
                console.log("Brand already in the db")
                req.flash("error", "Brand already exists")
                res.redirect("/admin/addBrand")
            } else {
                await brand.create(req.body)
                res.redirect("/admin/brand")
            }
        } catch (error) {
            console.log(error)
        }
    },
    getBrand: async (req, res) => {

        const page = parseInt(req.query.page) || 1; 
        const perPage = 5; 
        const skip = (page - 1) * perPage;
        const brands = await brand.find({}).sort({ name: 1 }).skip(skip).limit(perPage);
        const totalCount = await brand.countDocuments();
        console.log('........................');
        res.render("./admin/brand", {
            brands,

            currentPage: page,
            perPage,
            totalCount,
            totalPages: Math.ceil(totalCount / perPage),
        });
    },
    deleteBrand: async (req, res) => {
        const { id } = req.params
        const delBrand = await brand.findOneAndDelete({ _id: id })
        res.redirect("/admin/brand")
    },
    editBrand: async (req, res) => {
        const { id } = req.params
        const editBrand = await brand.findById({ _id: id })
        res.render("./admin/editBrand", { editBrand })
    },
    editedBrand: async (req, res) => {
        const { id } = req.params
        console.log(id)
        const { name } = req.body
        const brandUpdate = await brand.findByIdAndUpdate({ _id: id }, { name: name })
        res.redirect("/admin/brand",)
    }


}