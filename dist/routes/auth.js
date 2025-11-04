"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = require("express");
const db_1 = __importDefault(require("../lib/db"));
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    let connection;
    try {
        const { username, password } = req.body;
        console.log('Intentando login para:', username);
        connection = await db_1.default.getConnection();
        const [rows] = await connection.execute('SELECT id, usrName, usrUserName, usrPassword FROM users WHERE usrUserName = ? LIMIT 1', [username]);
        const user = rows[0];
        if (!user) {
            console.log('Usuario no encontrado:', username);
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        console.log('Usuario encontrado:', user.usrUserName);
        const isValid = await bcryptjs_1.default.compare(password, user.usrPassword);
        if (!isValid) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        console.log('Login exitoso para:', user.usrUserName);
        return res.status(200).json({
            id: user.id,
            usrName: user.usrName,
            usrUserName: user.usrUserName
        });
    }
    catch (error) {
        console.error('Error en login:', error.message);
        console.error('Código de error:', error.code);
        return res.status(500).json({
            error: 'Error en el servidor',
            details: error.message
        });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.default = router;
