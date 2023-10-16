import bcrypt from "bcryptjs"

const users = [

    {
        name:"Admin User",
        email:"admin@email.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin: true
    },
    {
        name:"RJ Robinson",
        email:"rj@email.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin: false
    },
    {
        name:"Fernne Robinson",
        email:"fernne@email.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin: false
    }
]

export default users