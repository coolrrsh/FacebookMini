const mongoose=require('mongoose');



module.exports = mongoose.model('Post',{
    mesg : String,
    author: {type:mongoose.Schema.Types.ObjectId,ref:'User'}
});