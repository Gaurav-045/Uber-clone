const userModel = require('../models/user.model');


module.exports.createUser = async({firstname, lastname, email, password}) => {
    if (! firstname  || !email || !password) {
        throw new Error('Please provide all required fields');
    }

    const user = await userModel.create({
        name: {
            firstname,
            lastname
        },
        email,
        password
    });
    return user;
}