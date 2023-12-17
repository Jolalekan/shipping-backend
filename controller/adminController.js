const adminService = require("../service/adminService");
const Admin = require("../model/Admin")
const registerAdmin = async (req, res) => {
    const adminData = req.body;
    try {

        const existingAdmin = await Admin.findOne({ email: adminData.email })
        if (existingAdmin) {
            return res.status(400).json({ message: "email already taking" })
        }

        const newAdmin = await adminService.createAdmin(adminData)

        res.json(newAdmin)

    } catch (error) {
        console.error("Error registering admin")
        res.status(500).json({ message: error.message })
    }
}

const adminLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const loginResult = await adminService.login(email, password, res)

        if (loginResult) {
            res.status(200).json({ message: "Login successful", admin: loginResult.admin, token: loginResult.token })
        } else {
            res.status(401).json({ message: "invalid credentials" })
        }
    } catch (error) {
        console.error('Error during login')
        res.status(500).json({ message: error.message })
    }

}


module.exports = {
    registerAdmin,
    adminLogin
}