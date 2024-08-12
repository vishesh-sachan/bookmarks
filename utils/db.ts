import mongoose from "mongoose";

const DBurl = process.env.MONGODB_CONNECTION_STRING || ''

mongoose.connect(DBurl)

const UserSchema = new mongoose.Schema({
    username: String,
    pasword: String,
    folders: [String]
})

const bookMarkSchema = new mongoose.Schema({
    userId: String,
    name: String,
    url: String,
    folder: String
})


export const User = mongoose.model('User' , UserSchema)
export const BookMark = mongoose.model('BookMark' , bookMarkSchema)

