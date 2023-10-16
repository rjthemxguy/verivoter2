import RivCo from "../models/rivCoModel.js"
import asyncHandler from "../middleware/asyncHandler.js"

const getVoters = asyncHandler(async(req,res)=>{

    
    const queryObj = {}

    if(req.body.last !=="") {
        queryObj["szNameLast"] = req.body.last;
    }

    if(req.body.first !=="") {
        queryObj["szNameFirst"] = req.body.first;
    }

    if(req.body.city !=="") {
        queryObj["szSitusCity"] = req.body.city;
    }

    if(req.body.street !=="") {
        queryObj["szStreetName"] = req.body.street;
    }

    if(req.body.houseNum !=="") {
        queryObj["sHouseNum"] = req.body.houseNum;
    }
    
    
    const voters = await RivCo.find(queryObj)
    res.status(200).json(voters)
})

export {getVoters}