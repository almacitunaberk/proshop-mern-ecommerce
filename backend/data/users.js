import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true        
    },
    {
        name: 'Tuna Almaci',
        email: 'tuna@example.com',
        password: bcrypt.hashSync('tunaberk', 10),            
    },    
    {
        name: 'Test User',
        email: 'test@example.com',
        password: bcrypt.hashSync('testest', 10),            
    },    
]