
// secret variable for JWT token strategy and give secret key. Can use anything here

// In place of password try to hit your mongoDB password

module.exports = {
    secret: 'yoursecret',
    database: 'mongodb+srv://adeshflutter:<Password>@cluster0.fkxal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}