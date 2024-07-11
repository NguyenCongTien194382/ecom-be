import express from "express";
import { checkToken, checkRoleAdmin } from "../services/functions.js";
import { getListCustomer, deleteCustomer, getSummary } from "../controllers/user.js";

const router = express.Router();

router.get('/list', getListCustomer)
router.delete('/:id', deleteCustomer)
router.get('/summary', getSummary)

export default router