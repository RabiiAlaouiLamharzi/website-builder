import Pages from '../modals/page.modal';
import User from '../modals/user.modal';

export const createPage = async (pageBody) => {
  const slug = pageBody.name.toLowerCase().split(' ').join('-');
  pageBody.slug = slug;
  const page = new Pages(pageBody);
  const pageResponse = await page.save();
  return pageResponse;
};
export const changeContent = async (pageBody) => {
  const slug = pageBody.name.toLowerCase().split(' ').join('-');
  pageBody.slug = slug;
  const page = new Pages(pageBody);
  const pageResponse = await page.save();
  return pageResponse;
};
export const deletePage = async (pageId) => {
  try {
    const page = await Pages.findByIdAndDelete(pageId);
    return page;
  } catch (error) {
    throw new Error(`Error deleting page: ${error.message}`);
  }
};
export const updatePage = async (req, res) => {
  const { pageId } = req.params;
  const { name } = req.body;
  const slug = name.toLowerCase().split(' ').join('-');
  try {
    const updatedPage = await Pages.findByIdAndUpdate(pageId, { name, slug }, { new: true });
    if (!updatedPage) {
      console.log(`Page with ID ${pageId} not found`);
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    return res.status(200).json({ success: true, page: updatedPage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error updating page' });
  }
};
export const pageDetails = async (pageId) => {
  const pages = await Pages.findOne({ _id: pageId });
  return pages;
};
export const saveDescContent = async (pageId, description) => {
  const pageUpdated = await Pages.findOneAndUpdate(
    { _id: pageId },
    { description },
    { new: true }
  );
  return pageUpdated;
};
export const saveWebsiteType = async (pageId, websiteType) => {
  const pageUpdated = await Pages.findOneAndUpdate(
    { _id: pageId },
    { websiteType },
    { new: true }
  );
  return pageUpdated;
};
export const saveNumberPages = async (pageId, numberPages) => {
  const pageUpdated = await Pages.findOneAndUpdate(
    { _id: pageId },
    { numberPages },
    { new: true }
  );
  return pageUpdated;
};
export const saveIndustry = async (pageId, industry) => {
  const pageUpdated = await Pages.findOneAndUpdate(
    { _id: pageId },
    { industry },
    { new: true }
  );
  return pageUpdated;
};
export const saveTargetAudience = async (pageId, targetAudience) => {
  const pageUpdated = await Pages.findOneAndUpdate(
    { _id: pageId },
    { targetAudience },
    { new: true }
  );
  return pageUpdated;
};
export const saveLanguage = async (pageId, language) => {
  const pageUpdated = await Pages.findOneAndUpdate(
    { _id: pageId },
    { language },
    { new: true }
  );
  return pageUpdated;
};
export const savePageContent = async (pageId, content) => {
  const pageUpdated = await Pages.findOneAndUpdate(
    { _id: pageId },
    { content },
    { new: true }
  );
  return pageUpdated;
};
export const findPageById = async (pageId) => {
  const page = await Pages.findById(pageId);
  return page;
};
export const listPages = async () => {
  const pages = await Pages.find({}).sort({ createdAt: -1 });
  return pages || [];;
};

export const listUsers = async () => {
  const users = await User.find({}).sort({ createdAt: -1 });
  return users || [];;
};