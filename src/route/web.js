import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    // get post crud
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);


    // get crud new example
    router.get('/get-crud', homeController.displaygetCRUD);

    return app.use("/", router);
}

module.exports = initWebRoutes;