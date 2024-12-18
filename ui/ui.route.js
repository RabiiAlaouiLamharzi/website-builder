import express from 'express';
import { editor, dashboard, manager, details, builder, login, register, administration, error } from './ui.controller';

const uiRoute = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

const isAdmin = (req, res, next) => {
    const adminId = process.env.ADMIN_ID;
    if (req.user && req.user.id === adminId) {
        return next();
    }
    res.redirect('/error');
};

uiRoute.get('/login', login);
uiRoute.get('/register', register);

uiRoute.get('/', isAuthenticated, dashboard);
uiRoute.get('/manager', isAuthenticated, manager);
uiRoute.get('/builder', isAuthenticated, builder);
uiRoute.get('/administration', isAuthenticated, isAdmin, administration);
uiRoute.get('/details/:pageId', isAuthenticated, details);
uiRoute.get('/editor/:pageId', isAuthenticated, editor);

uiRoute.all('*', (req, res) => {
    error(req, res);
});

export default uiRoute;
