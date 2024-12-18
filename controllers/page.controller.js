import { createPage, deletePage, listPages, pageDetails, savePageContent, updatePage, saveDescContent, saveWebsiteType, saveNumberPages, saveIndustry, saveTargetAudience, saveLanguage } from '../services/page.services';
  
export const create = async (req, res) => {
  const pageBody = req.body;
  pageBody.user = req.user._id;
  const page = await createPage(pageBody);
  res.json(page);
};
export const list = async (req, res) => {
  console.log("Current User:", req.user);

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const pages = await listPages({ user: req.user._id });
    res.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ message: "Failed to fetch pages" });
  }
};

  export const update = async (req, res) => {
    const { pageId } = req.params;
    const pageBody = req.body;
    const page = await updatePage(pageId, pageBody);
    res.json(page);
  };
  export const changeContent = async (req, res) => {
    const { pageId } = req.params;
    const pageContent = await savePageContent(pageId, req.body);
    res.json(pageContent);
  };

  export const changeDescription = async (req, res) => {
    const { pageId } = req.params;
    const { description } = req.body;
    try {
      const pageContent = await saveDescContent(pageId, description);
      if (!pageContent) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      res.status(200).json({ success: true, pageContent });
    } catch (error) {
      console.error('Error updating page content:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  export const changeWebsiteType = async (req, res) => {
    const { pageId } = req.params;
    const { websiteType } = req.body;
    try {
      const pageContent = await saveWebsiteType(pageId, websiteType);
      if (!pageContent) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      res.status(200).json({ success: true, pageContent });
    } catch (error) {
      console.error('Error updating page content:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  export const changeNumberPages = async (req, res) => {
    const { pageId } = req.params;
    const { numberPages } = req.body;
    try {
      const pageContent = await saveNumberPages(pageId, numberPages);
      if (!pageContent) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      res.status(200).json({ success: true, pageContent });
    } catch (error) {
      console.error('Error updating page content:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  export const changeIndustry = async (req, res) => {
    const { pageId } = req.params;
    const { industry } = req.body;
    try {
      const pageContent = await saveIndustry(pageId, industry);
      if (!pageContent) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      res.status(200).json({ success: true, pageContent });
    } catch (error) {
      console.error('Error updating page content:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  export const changeTargetAudience = async (req, res) => {
    const { pageId } = req.params;
    const { targetAudience } = req.body;
    try {
      const pageContent = await saveTargetAudience(pageId, targetAudience);
      if (!pageContent) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      res.status(200).json({ success: true, pageContent });
    } catch (error) {
      console.error('Error updating page content:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  export const changeLanguage = async (req, res) => {
    const { pageId } = req.params;
    const { language } = req.body;
    try {
      const pageContent = await saveLanguage(pageId, language);
      if (!pageContent) {
        return res.status(404).json({ success: false, message: 'Page not found' });
      }
      res.status(200).json({ success: true, pageContent });
    } catch (error) {
      console.error('Error updating page content:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  export const deletePageRecord = async (req, res) => {
    const { pageId } = req.params;
    try {
        const page = await pageDetails(pageId);
        if (page.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to delete this page' });
        }
        const deletedPage = await deletePage(pageId);
        const pages = await listPages({ user: req.user._id });
        res.json({ pages });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting page', error });
    }
};

  export const details = async (req, res) => {
    const { pageId } = req.params;
    const details = await pageDetails(pageId);
    res.json(details);
  };
  export const loadContent = async (req, res) => {
    const { pageId } = req.params;
    res.header('Content-Type', 'application/json');
    const pageData = await pageDetails(pageId);
    res.json(pageData.content);
  };
