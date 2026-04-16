const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isRaw = !['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(file.mimetype);
    return {
      folder: 'construction-saas/drawings',
      resource_type: isRaw ? 'raw' : 'auto',
      access_mode: 'public',
      public_id: file.fieldname + '-' + Date.now(),
    };
  },
});

module.exports = { cloudinary, storage };
