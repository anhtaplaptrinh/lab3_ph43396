const mongoose = require('mongoose');

const SanphamSchema = mongoose.Schema({
    ten : {
        type : String,
        require : true,
    },
    gia : {
        type : Number,
        require : true,
    },
    soluong : {
        type : Number,
        require : true,
    },
    tonkho : {
        type : Boolean,
       
    },
})
const sanphamModel = mongoose.model('sanpham',SanphamSchema);
module.exports = sanphamModel;