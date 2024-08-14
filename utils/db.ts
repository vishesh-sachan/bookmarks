import mongoose from "mongoose";

const DBurl = process.env.MONGODB_CONNECTION_STRING || ''

if(!mongoose.connections[0].readyState){
    try {
        mongoose.connect(DBurl)
        
    } catch (error) {
        console.log({msg:"error while connecting to DB"} , error)
    }

}

const UserSchema = new mongoose.Schema({
    username: {type:String, unique:true, required:true},
    password: {type:String, required:true},
    folders: {type:[String] , default:['Root']}
})

const bookMarkSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    name: {type:String, required:true},
    url: {type:String, required:true},
    folder: {type:String, required:true}
})


// export const User = mongoose.model('User' , UserSchema)
// export const BookMark = mongoose.model('BookMark' , bookMarkSchema)

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const BookMark = mongoose.models.BookMark || mongoose.model('BookMark', bookMarkSchema);
