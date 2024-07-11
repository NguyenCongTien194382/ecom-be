import bcrypt from 'bcrypt'

export const checkToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
    });
};

export const checkRoleAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role === 'member') {
        return res.status(401).json({ message: "User not admin" });
    }
    next();
}

export const hashPassword = async (password) => {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const verifyPassword = async (password = '', hashPassword = '') => {
    return bcrypt.compareSync(password, hashPassword)
}

export const setError = (res, message, code = 500) => {
    return res.status(code).json({ data: null, code, error: { message } })
};

export const success = (res, message = "", data = []) => {
    return res.status(200).json({ data: { result: true, message: message, ...data }, error: null, })
};