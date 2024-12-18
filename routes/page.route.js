import express from 'express';
import { changeContent, changeDescription, changeWebsiteType, changeNumberPages, changeIndustry, changeTargetAudience, changeLanguage, create, deletePageRecord, list, update, details, loadContent } from '../controllers/page.controller';

const pageRoute = express.Router();

pageRoute.delete('/:pageId', deletePageRecord);

pageRoute.post('/', create);
pageRoute.post('/:pageId/content', changeContent);

pageRoute.post('/:pageId/description', changeDescription);
pageRoute.post('/:pageId/website-type', changeWebsiteType);
pageRoute.post('/:pageId/number-pages', changeNumberPages);
pageRoute.post('/:pageId/industry', changeIndustry);
pageRoute.post('/:pageId/target-audience', changeTargetAudience);
pageRoute.post('/:pageId/language', changeLanguage);

pageRoute.put('/:pageId', update);
pageRoute.delete('/:pageId', deletePageRecord);

pageRoute.get('/:pageId', details);
pageRoute.get('/', list);
pageRoute.get('/:pageId/content', loadContent);

export default pageRoute;