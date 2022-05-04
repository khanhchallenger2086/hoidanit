import { json } from 'express/lib/response';
import db from '../models/index';
import CRUDservices from '../services/CRUDsevices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);

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


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displaygetCRUD: displaygetCRUD,
}
