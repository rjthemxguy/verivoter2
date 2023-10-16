import mongoose from "mongoose";


const rivCoSchema = new mongoose.Schema({
    szNameFirst: {
        type: String,
        required: true
    },
    szNameLast: {
        type: String,
        required: true
    },
    szNameMiddle: {
        type: String,
        required: false
    },
    szSitusAddress: {
        type: String,
        required: true
    },
    szSitusCity: {
        type: String,
        required: true
    },
    szSitusState: {
        type: String,
        required: true
    },
    sHouseNum: {
        type: String,
        required: true
    },
    szStreetName: {
        type: String,
        required: true
    },
    szSitusZip: {
        type: String,
        required: true
    },
    szPartyName: {
        type: String,
        required: false
    },
    dtBirthDate: {
        type: String,
        required: true
    }

})

const RivCo = mongoose.model("rivCo", rivCoSchema)

export default RivCo