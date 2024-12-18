const editor = grapesjs.init({
  container: "#editor",
  fromElement: true,
  width: "auto",
  storageManager: false,
  plugins: ["gjs-blocks-basic"],
  pluginsOpts: {
    "gjs-blocks-basic": {},
  },
  storageManager: {
    type: 'remote',
    stepsBeforeSave: 1,
    contentTypeJson: true,
    storeComponents: true,
    storeStyles: true,
    storeHtml: true,
    storeCss: true,
    id: 'my-',
    urlStore: `/pages/${location.pathname.split('/')[2]}/content`,
    urlLoad: `/pages/${location.pathname.split('/')[2]}/content`,
    headers: {
      'Content-Type': 'application/json',
    },
  },
});
