const path = require('path');
const multer = require("multer")

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  fileFilter : function (req, file, cb) {
    const filetypes = /jpg|png|gif|jpeg/;
    const mimetype = filetypes.test(file.mimetype);
    const extmane = filetypes.test(path.extname(file.originalname));
    if (mimetype && extmane) {
      return cb(null, true);
    }
    return cb(new Error('Error: El archivo debe ser una imagen valida.'), false);
  },
  limits: { fileSize: 2500000 }
});

module.exports = upload;