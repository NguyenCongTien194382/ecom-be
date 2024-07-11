import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { setError, success, hashPassword, verifyPassword } from '../services/functions.js'
import { validateEmail } from '../services/validate.js'

const generateToken = async (payload = {}) => {
    const access_token = jwt.sign({
        ...payload,
        iat: new Date().getTime(),
        exp: new Date().setHours(new Date().getHours() + 24)
    }, process.env.JWT_SECRET)

    return { access_token }
}

const signInWithGoogle = async (authGoogleID, userName, email, avatarUrl) => {
    let foundUser = await User.findOne({ authGoogleID: authGoogleID })
    if (!foundUser) {
        foundUser = await User.create({
            userName,
            email,
            avatarUrl,
            authGoogleID,
            authType: 'google'
        })
    }
    return foundUser
}

export const signIn = async (req, res) => {
    try {
        let foundUser
        const { authType, email, password } = req.body

        if (authType === 'google') {
            const { authGoogleID, userName, email, avatarUrl } = req.body
            foundUser = await signInWithGoogle(authGoogleID, userName, email, avatarUrl)
        }
        if (!authType || authType === '') {
            foundUser = await User.findOne({ email: email, authType: 'local' })
            if (!foundUser) return setError(res, "Email không tồn tại", 400);
            const isVerifyPassword = await verifyPassword(password, foundUser.password)
            if (!isVerifyPassword) return setError(res, "Sai thông tin tài khoản mật khẩu", 400);
        }

        const payload = {
            id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role
        }
        const { access_token } = await generateToken(payload)

        res.setHeader('Authorization', access_token)
        return success(res, 'Đăng nhập thành công')
    } catch (error) {
        console.log(error)
        return setError(res, "Đã có lỗi xảy ra", 400);
    }
}

export const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        console.log(req.body)

        if (!validateEmail(email)) return setError(res, "Email không đúng định dạng", 400);

        const foundUser = await User.findOne({ email, authType: 'local' })

        if (foundUser) return setError(res, "Email đã tồn tại", 400);

        const passwordHash = await hashPassword(password)

        const newUser = await User.create({
            userName,
            authType: 'local',
            email,
            password: passwordHash
        })

        return success(res, 'Đăng ký thành công')

    } catch (error) {
        console.error(error)
        return setError(res, "Đã có lỗi xảy ra", 400);
    }
}