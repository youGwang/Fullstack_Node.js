const express = require('express')
const User  = require('../models/user')
const router = express.Router()

router.post('/insert', async(req,res, next)=>{
    
    let {id, pw, age} = req.body
    
    try{
        //insert
        const result = await User.create({
            id : id,    //column : value
            pw : pw,
            age : age
        })

        res.json(result)
    }catch(err){
        next(err) //에러처리 미들웨어
    }

})

router.get('/select', async(req,res, next)=>{
    try{
        const result = await User.findAll()
        res.json(result)

    }catch(err){
        next(err)
    }
})

router.get('/select/:id', async(req,res,next)=>{

    let reqId = req.params.id

    try{
        const result = await User.findOne({
            where : {id : reqId},
            attributes : ['id', 'age']
        })


        res.json(result)
    }catch(err){
            next(err)
        }

})

//UPDATE : 모두 업데이트
//PATCH : 일부 업데이트 (data -> body)
router.patch('/update/:id', async (req,res, next)=>{
    try{
        const result = await User.update({
            pw : req.body.pw, 
            age : req.body.age
        },{
            where : {id : req.params.id}
        })


        res.json(result)
    }catch(err){
        next(err)
    }
})


router.delete('/delete/:id', async(req,res,next)=>{
    try{
        const result = await User.destroy({
            where : {id : req.params.id}
        })
        res.json(result)
    }catch(err){
        next(err)
    }
})

module.exports = router