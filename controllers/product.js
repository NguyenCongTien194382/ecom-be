import multer from 'multer';
import path from 'path'
import Product from '../models/Product.js'
import { setError, success } from '../services/functions.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/product');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

export const upload = multer({ storage: storage });

export const uploadImageProduct = (req, res) => {
    try {
        const images = req.files.map(file => file.filename)
        return success(res, 'Tải ảnh thành công', { images })
    } catch (error) {
        console.error(error)
        return setError(res, "Đã có lỗi xảy ra", 400);
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, category, description, urlImage, sizeInfo } = req.body
        const id = 'NCT' + Date.now()

        const product = await Product.create({
            id,
            name,
            category,
            description,
            urlImage,
            sizeInfo
        })
        return success(res, 'Thêm sản phẩm thành công', { product })
    } catch (error) {
        console.error(error)
        return setError(res, "Đã có lỗi xảy ra", 400);
    }
}

export const editProduct = async (req, res) => {
    try {
        const id = req.params.id
        const { name, category, description, urlImage, sizeInfo } = req.body
        const update = {}
        if (name) update.name = name
        if (category) update.category = category
        if (description) update.description = description
        if (urlImage) update.urlImage = urlImage
        if (sizeInfo) update.sizeInfo = sizeInfo
        const product = await Product.findOneAndUpdate({ id: id }, update)
        return success(res, 'Cập nhật sản phẩm thành công')
    } catch (error) {
        console.error(error)
        return setError(res, "Đã có lỗi xảy ra", 400);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        await Product.findOneAndDelete({ id })
        return success(res, 'Xoá sản phẩm thành công')
    } catch (error) {
        console.error(error)
        return setError(res, "Đã có lỗi xảy ra", 400);
    }
}