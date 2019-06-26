const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number
    },
    date: {
        type: String
    }
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order