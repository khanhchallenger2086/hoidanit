import db from '../models/index';
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserExist(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleid', 'password'],
                    where: { email: email },
                    raw: true
                })

                if (user) {
                    // compare password 
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.message = 'Login success';
                        console.log(user);
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.message = 'Wrong Password';
                    }
                } else {
                    userData.errCode = 3;
                    userData.message = 'User not found';
                }
            } else {
                userData.errCode = 4
                userData.message = "Your's email isn't exist in your system, plz try other email!"
            }

            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserExist = (yourEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: yourEmail }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserExist(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used, Plz try another email'
                });
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            console.log(data);
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

            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (id_user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id_user },
            })
            if (!user) {
                resolve({
                    errCode: 1,
                    message: 'User not found'
                })
            }
            await db.User.destroy({
                where: { id: id_user }
            });
            resolve({
                errCode: 0,
                message: 'Delete'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters'
                });
            }
            let User = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (User) {
                User.email = data.email;
                User.firstName = data.firstName;
                User.lastName = data.lastName;
                User.phonenumber = data.phonenumber;
                await User.save();

                resolve({
                    errCode: 0,
                    message: 'Edit success'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    deleteUser: deleteUser,
    editUser: editUser
}