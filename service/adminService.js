const Admin = require("../model/Admin")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const createAdmin = async (adminData) => {

    const hashedPassword = await bcrypt.hash(adminData.password, 10)

    const admin = new Admin({
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword
    })

    await admin.save()
    return admin

}


const generateToken=(admin)=>{
    const payload = {
        id:admin._id,
        email: admin.email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})

    
    return token
}


const login = async (email, password, res) => {
    try {
        const admin = await Admin.findOne({ email });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const { password:pass, ...adminInfo } = admin.toObject()
            const token = generateToken(adminInfo);
            res.cookie('authToken', token, { httpOnly: true, secure: true });
             return {admin, token, message: "Login succesful"}
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error login in");
        throw error;
    }
};

module.exports = {
    createAdmin,
    login
}