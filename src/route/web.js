// import express from "express";

// let router = express.Router(); // khởi tạo router

// let initWebRoutes = (app) => {
//     router.get('/', (req, res) => {
//         return res.send('lâm khánh');
//     });

//     return app.use("/", router);  // sử dụng router
// }

// module.exports = initWebRoutes;


import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    return app.use("/", router);
}

module.exports = initWebRoutes;