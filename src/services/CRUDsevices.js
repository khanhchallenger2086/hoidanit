
import bcrypt from 'bcryptjs';
import db from '../models/index';
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        try {
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });

            resolve('create user succeed');
        } catch (e) {
            reject(e);
        }

    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let Users = db.User.findAll({
                raw: true,
            });
            resolve(Users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserById = (id_user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.User.findOne({
                where: { id: id_user },
                raw: true,
            })
            resolve(User)
        } catch (e) {
            reject(e)
        }
    })
}

let updateCRUD = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.User.findOne({
                where: { id: data.id },
            })

            if (User) {
                User.email = data.email;
                User.firstName = data.firstName;
                User.lastName = data.lastName;
                User.phonenumber = data.phonenumber;
                await User.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserById = (id_user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.User.findOne({
                where: { id: id_user },
            })
            await User.destroy();
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getUser: getUser,
    getUserById: getUserById,
    updateCRUD: updateCRUD,
    deleteUserById: deleteUserById,
}