/* eslint-disable comma-dangle */
import express from 'express';

import AuthController from './controller';
import Validators from '../shared/middleware/validator';

const router = express.Router();

router.post('/signup', Validators.SignupValidator, AuthController.registration);
router.post('/login', Validators.LoginValidator, AuthController.loginUser);

router.post('/application', AuthController.createApplication);
router.put('/application/:id', AuthController.updateApplicationStatus);
router.get('/application', AuthController.fetchApplication);
router.get('/application/:id', AuthController.fetchApplicationByID);

router.get('/meet/student/:email', AuthController.sendEmailToStudent);
router.put('/student/program', AuthController.selectProgram);
router.put('/program/update/:id', AuthController.updateProgramStatus);

export default router;
