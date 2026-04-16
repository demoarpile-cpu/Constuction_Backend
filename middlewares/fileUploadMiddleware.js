const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../utils/cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = 'construction-saas/general';
        if (req.baseUrl.includes('drawings')) folder = 'construction-saas/drawings';
        else if (req.baseUrl.includes('rfis')) folder = 'construction-saas/rfis';
        else if (req.baseUrl.includes('vendors')) folder = 'construction-saas/vendors';
        else if (req.baseUrl.includes('invoices')) folder = 'construction-saas/invoices';
        else if (req.baseUrl.includes('equipment')) folder = 'construction-saas/equipment';

        const mimetype = file.mimetype || '';
        // Force PDF to be 'raw' to avoid 401 image authorization issues
        const isRaw = !['image/jpeg', 'image/png', 'image/gif'].includes(mimetype);
        
        let resourceType = isRaw ? 'raw' : 'auto';

        const params = {
            folder: folder,
            resource_type: resourceType,
            type: 'upload', // Explicitly public
            public_id: file.fieldname + '-' + Date.now(),
            access_mode: 'public'
        };
        return params;
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

module.exports = upload;
