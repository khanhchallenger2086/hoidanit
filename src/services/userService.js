import db from '../models/index';
import bcrypt from 'bcryptjs';

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

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers
}