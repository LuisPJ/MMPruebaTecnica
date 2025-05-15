const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//Usuario de ejemplo (esto seria de una base de datos)
const user = [
    {
        id: 1,
        username: 'testuser',
        password: bcrypt.hashSync('password123', 10)
    }
];

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundUser = user.find(u => u.username === username);
        if (!foundUser) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        const isPasswordValid = bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });
    }catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    login
};