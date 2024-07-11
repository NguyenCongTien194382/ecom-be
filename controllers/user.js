import User from '../models/User.js'
import { setError, success } from '../services/functions.js'

export const getListCustomer = async (req, res) => {
    try {
        const users = await User.find({ role: 'member' }).sort({ createdAt: -1 })
        return success(res, 'Lấy danh sách khách hàng thành công', { users })
    } catch (error) {
        console.error(error)
        return setError(res, "Đã có lỗi xảy ra", 400);
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id
        await User.findOneAndDelete({ _id: id })
        return success(res, 'Xoá khách hàng thành công')
    } catch (error) {
        console.error(error)
        return setError(res, "Đã có lỗi xảy ra", 400);
    }
}

export const getSummary = async (req, res) => {
    try {
        const authType = await User.aggregate([
            {
                $group: {
                    _id: '$authType',
                    count: { $sum: 1 }
                }
            }
        ]);
        const rank = await User.aggregate([
            {
                $group: {
                    _id: '$rank',
                    count: { $sum: 1 }
                }
            }
        ]);

        const createdAt = await User.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        return success(res, 'Lấy dữ liệu thành công', { statsAuthType: authType, statsRank: rank, statsCreatedAt: createdAt })
    } catch (error) {
        console.error(error)
        return setError(res, "Đã có lỗi xảy ra", 400);
    }
}