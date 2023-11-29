import { Router } from "express"
import publicController from "../controller/publicRoute.js";
import authController from "../controller/auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import multer from "multer";
import uploadPublic from "../middleware/multer.js";
import {v2 as cloudinary} from 'cloudinary';
import upload from "../controller/upload.js";
import dataDisplay from "../controller/dataDisplay.js";
import fetchingMethod from "../controller/dataDisplay.js";


const apiRoutes= Router()
const PORT= 8080;

apiRoutes.get('/', publicController.get)

apiRoutes.post('/userRegistration', authController.userRegister)


apiRoutes.post('/userLogin', authController.userLogin)

apiRoutes.get('/publicController', authController.publicController)
apiRoutes.get('/protectedController', isAuthenticated,authController.protectedController)
apiRoutes.get('/fetchdata', fetchingMethod.dataDisplay)
apiRoutes.get('/fetchdata/:id', fetchingMethod.fetchById)

apiRoutes.post('/upload',uploadPublic.single('image'), upload)



export default apiRoutes;