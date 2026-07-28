import { Router } from "express";
import { createOrder, webhook } from "../controller/payment.controller";
const PaymentRouter = Router()

PaymentRouter.post("/order", createOrder)
PaymentRouter.post("/webhook", webhook)


export default PaymentRouter

