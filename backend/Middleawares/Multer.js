const multer = require('multer');
const path = require('path')



// set the store of images
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "..", "public", "Images"));
  },

  // set a unique file name
  filename: function(req, file, cb){
    const ext = file.originalname.split('.').pop();
    cb(null,`file-${Date.now()}.${ext}`)
  }
})

const upload = multer({storage}).single('profileImage');


module.exports = upload 

