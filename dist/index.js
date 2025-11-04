"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const ivr_1 = __importDefault(require("./routes/ivr"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas
app.use('/api/auth', auth_1.default);
app.use('/api/ivr', ivr_1.default);
app.get('/', (req, res) => {
    res.send('API de Reportes IVR funcionando');
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});
