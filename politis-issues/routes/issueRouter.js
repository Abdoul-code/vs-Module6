const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/Issue.js')

//Get All Issues 
issueRouter.get("/", (req,res,next)=>{
    Issue.find((err , issues)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)

    })
})

//Get issue by user id
issueRouter.get("/user", (req,res,next)=>{
    Issue.find({user:req.auth._id }, (err,issues)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

//Add new isssue
issueRouter.post("/",(req,res,next)=>{
    req.body.user = req.auth._id
    const newIssue = new Issue(req.body)
    newIssue.save((err,savedIssue)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

//Delete issue
issueRouter.delete("/:issueId",(req,res,next)=>{
    Issue.findOneAndDelete(
        {_id:req.params.issueId, user:req.auth._id},
        (err,deletedIssue)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Succefully delete issue: ${deletedIssue.title}`)
        }
    )
})

//Update issue
issueRouter.put("/:issueId", (req,res,next)=>{
    Issue.findByIdAndUpdate(
        {_id:req.params.issueId, user:req.auth._id},
        req.body,
        {new: true},
        (err, updatedIssue)=>{
            if(err){
                res.status(500)
                return next (err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})


module.exports = issueRouter