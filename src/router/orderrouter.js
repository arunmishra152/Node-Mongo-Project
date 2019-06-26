const express = require('express')
const router = express.Router()
const Order = require('../model/order')

router.post('/order',async (req,res)=>{
    const order = new Order(req.body)
    try {
        await order.save()
        res.status(201).send(order)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/orders',async (req,res)=>{
   const order = await Order.aggregate([{
       $lookup: {
           from: 'users',
           localField: 'userId',
           foreignField: 'userId',
           as: 'userData'
       },
    },
    {
        $unwind: "$userData"
    },
    {
       $group: {
           _id: {userId: "$userId", name: "$userData.name"},
           noOfOrders: {$sum: 1},
           averageBillValue: {$avg: "$subtotal"}
       },
    },
   
    {
        $project: {
            userId: "$_id.userId", name: "$_id.name", _id:0, noOfOrders: 1,
            averageBillValue: { $toInt: "$averageBillValue" }
        }
    },
   
    {
        $sort: {
            userId: 1
        }
    },
    {
        $out: "noOfOrders"
    }
])
    res.send(order)
})

module.exports = router