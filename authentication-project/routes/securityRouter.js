const express = require('express')
const securityOfficer = express.Router()
const Officer = require('../models/sitraSecurity.js')

//Get Officer
securityOfficer.get("/",(req,res,next)=>{
 Officer.find((err,officerInfo)=>{
     if(err){
         res.status(500)
         return next(err)
     }
     return res.status(200).send(officerInfo)
 })
})

//Get officer by user id
securityOfficer.get("/user",(req,res,next)=>{
    Officer.find({user: req.auth._id}, (err,officerInfo)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(officerInfo)
    })
})

//Post Officer
securityOfficer.post("/",(req,res,next)=>{
    req.body.user = req.auth._id
    const newOfficer = new Officer(req.body)
    newOfficer.save((err,savedOfficer)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedOfficer)

    })
})
//Delete Officer
securityOfficer.delete("/:officerId", (req,res,next)=>{
    Officer.findOneAndDelete(
        {_id:req.params.officerId, user:req.auth._id},
        (err,deleteOfficer)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Succefully deleted ${deleteOfficer.firstName} from the DB`)
        })

})

//Update Officer
securityOfficer.put("/:officerId", (req,res,next)=>{
    Officer.findOneAndUpdate(
        {_id:req.params.officerId, user:req.auth._id},
        req.body,
        {new:true},
        (err,updateOfficer)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updateOfficer)
        }
    )
 
})




module.exports = securityOfficer