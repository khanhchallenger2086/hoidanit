import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    // get post crud
    router.get('/crud', homeController.getCRUD); // create
    router.post('/post-crud', homeController.postCRUD); // create and post data


    // get crud new example
    router.get('/get-crud', homeController.displaygetCRUD); // read data
    router.get('/edit-user', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);

    router.get('/delete-user', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-users', userController.handleGetAllUsers); // get all users

    return app.use("/", router);
}

module.exports = initWebRoutes;