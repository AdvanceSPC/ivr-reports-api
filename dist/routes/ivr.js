"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../lib/db"));
const router = (0, express_1.Router)();
router.get('/data', async (req, res) => {
    const { startDate, endDate, canal } = req.query;
    let query = 'SELECT * FROM ivr WHERE 1=1';
    const params = [];
    if (startDate) {
        query += ' AND ivrDateStart >= ?';
        params.push(startDate);
    }
    if (endDate) {
        query += ' AND (ivrDateStart <= ? OR ivrDateStart IS NULL)';
        params.push(endDate);
    }
    if (canal && canal !== 'todos') {
        if (canal === 'llamadas') {
            query += " AND UPPER(ivrCanal) LIKE '%CALL%'";
        }
        else if (canal === 'whatsapp') {
            query += " AND UPPER(ivrCanal) LIKE '%WHATSAPP%'";
        }
        else if (canal === 'messenger') {
            query += " AND UPPER(ivrCanal) LIKE '%MESSENGER%'";
        }
    }
    query += ' ORDER BY ivrDateStart DESC';
    try {
        const [rows] = await db_1.default.execute(query, params);
        res.json(rows);
    }
    catch (error) {
        console.error('Error ejecutando consulta IVR:', error);
        res.status(500).json({ error: 'Error consultando datos de IVR' });
    }
});
exports.default = router;
