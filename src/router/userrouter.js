const express = require('express')
const router = express.Router()
const User = require('../model/user')

router.get('/', (req, res) => {
    res.send('router works')
})
router.post('/user', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.put('/user/:id', async (req,res)=>{
    const id = req.params.id
    //const orders = localStorage.getItem('noOfOrders')
    console.log(id)
    console.log(myData)
    try {
        if(id !== myData.userId){
            return res.send({error: true, message: 'userId not found'})
        }
        const user = await User.findOneAndUpdate({userId: id},{$set:{noOfOrders:myData.noOfOrders}},{new:true})
        res.status(200).send({success: true, message: 'Successfully Updated'})
    } catch (error) {
        res.status(400).send(error)
    }
    
   
})

module.exports = router