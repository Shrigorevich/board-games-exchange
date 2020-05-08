const imgur = require('imgur')
const config = require('config')

const CLIENT_ID = config.get('imgur.client_id');
const MAIL = config.get('imgur.mail');
const PASSWORD = config.get('imgur.password')

const imgurUpload = async (req, res, next) => {
   imgur.setClientId(CLIENT_ID);
   imgur.setCredentials(MAIL, PASSWORD, CLIENT_ID);

   const img = await imgur.uploadFile(req.file.path);
   req.imgLink = img.data.link;
   next();
}

module.exports = imgurUpload;