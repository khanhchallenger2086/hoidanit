import { json } from 'express/lib/response';
import db from '../models/index';
import CRUDservices from '../services/CRUDsevices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log(data);

        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}


let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body);
    console.log(message);
    return res.send('gửi thành công');
}

let displaygetCRUD = async (req, res) => {
    let data = await CRUDservices.getUser();
    return res.render('displaytableCRUD.ejs', {
        dataTable: data
    });
}


let getEditCRUD = async (req, res) => {
    let id_user = req.query.id;
    if (id_user) {
        let User = await CRUDservices.getUserById(id_user);
        return res.render('editCRUD.ejs', {
            User: User
        });
    } else {
        return res.send('user not found');
    }

}

let putCRUD = async (req, res) => {
    let allUsers = await CRUDservices.updateCRUD(req.body);
    return res.render('displaytableCRUD', {
        dataTable: allUsers
    });
    // return res.redirect('/get-crud');  // redirect thi do lam lai allUser
}

let deleteCRUD = async (req, res) => {
    let id_user = req.query.id;
    if (id_user) {
        await CRUDservices.deleteUserById(id_user);
        return res.send('delete success');
    } else {
        return res.send('user not found');
    }
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displaygetCRUD: displaygetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}
