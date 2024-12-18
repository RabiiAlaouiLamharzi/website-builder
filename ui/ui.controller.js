import { listPages, listUsers } from '../services/page.services';

export const dashboard = async (req, res) => {
  const pages = await listPages();
  const users = await listUsers();
  const userId = req.user._id;
  const adminId = process.env.ADMIN_ID;
  res.render('dashboard', { title: 'Webpage Builder', pages, user: req.user, userId, users, adminId });
};

export const error = async (req, res) => {
  res.render('404');
};

export const login = async (req, res) => {
  res.render('login');
};

export const register = async (req, res) => {
  res.render('register');
};

export const builder = async (req, res) => {
  const adminId = process.env.ADMIN_ID;
  const pages = await listPages();
  res.render('builder', { title: 'Webpage Builder', pages, adminId });
};

export const manager = async (req, res) => {
  const pages = await listPages();
  const userId = req.user._id;
  const adminId = process.env.ADMIN_ID;
  res.render('manager', { title: 'Webpage Builder', pages, userId, adminId });
};

export const administration = async (req, res) => {
  const pages = await listPages();
  const users = await listUsers();
  const userId = req.user._id;
  const adminId = process.env.ADMIN_ID;
  res.render('administration', { title: 'Webpage Builder', pages, user: req.user, userId, users, adminId });
};

export const details = async (req, res) => {
  const adminId = process.env.ADMIN_ID;
  const pages = await listPages();
  const selectedPage = pages.find((page) => page.id === req.params.pageId);
  res.render('details', { title: 'Webpage Builder', pages, selectedPage, adminId });
};

export const editor = async (req, res) => {
  const adminId = process.env.ADMIN_ID;
  const pages = await listPages();
  const selectedPage = pages.find((page) => page.id === req.params.pageId);
  res.render('editor', { title: 'Webpage Builder', pages, selectedPage, adminId });
};