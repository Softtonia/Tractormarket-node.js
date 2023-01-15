
const express = require('express');
const { adminLogin, adminRegister, adminForget, adminProfile, adminUpdate, adminReset } = require('../controller/adminController');
const {categoryGet,categoryPost,categoryPut,categoryDelete, categoryPatch} = require('../controller/categoryController');
const homeGet = require('../controller/homeController');
const {productGet,productPost,productPut,productDelete} = require('../controller/productController');
const authentication = require('../middelware/authentication');
const userRouter = new express.Router();
const multer  = require('multer');
const { brandGet, brandPost, brandPut, brandDelete, brandPatch } = require('../controller/brandController');
const { modelGet, modelPost, modelPut, modelDelete, filterWithCategoryGet, searchGet, modelPatch, filterWithBrandGet } = require('../controller/modelController');
const {statesGet,statesPost,statesPut,statesDelete,districtGet,districtPost,districtPut,districtDelete,
  blocksGet,blocksPost,blocksPut,blocksDelete, filterWithStateGet, statesPatch, districtPatch, blocksPatch} = require('../controller/productAddressController');
const {readFile,uploadFile, deleteFile} = require('../helper/readfile');
const { variationGet, variationPost, variationPut, variationDelete, variationCategoryGet, variationTypeGet, variationTypePost, variationTypePut, variationTypeDelete, variationTypePatch } = require('../controller/variationController');




/* section - Disk storage engien by multer  */

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/uploads`)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
     
    }
  });

  const fileFilter=(req, file, cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
        cb(null,true);
    }else{
        cb(null, false);
    }
 
   }
 
 var upload = multer({ storage:storage })

/* -- section - Disk storage engien by multer ends -- */

/* -- section - home multiple image multer start -- */
//    var homeMultiple = upload.fields([{name:'section1_card1_img'},{name:'section1_card2_img'},{name:'section1_card3_img'},{name:'section2_about_img'},{name:'section3_whyChoose_bgimg'},{name:'section4_card1_img'},{name:'section4_card2_img'},{name:'section4_card3_img'},{name:'section4_card4_img'}])
//    var aboutMultiple = upload.fields([{name:'section1_about_img'},{name:'section2_whatwesay_img'},{name:'section4_teaching_img'}])
/* -- section - home multiple image multer ends -- */




/* admin api router */
userRouter.post('/api/login' , adminLogin);
userRouter.post('/api/register' , adminRegister);
userRouter.put('/api/forget-password' , adminForget);
userRouter.get('/api/profile',authentication , adminProfile);
userRouter.put('/api/update-profile',authentication , adminUpdate );
userRouter.put('/api/reset-password' , adminReset );


/* category api router */
userRouter.get('/api/category', categoryGet);
userRouter.post('/api/category',authentication , categoryPost);
userRouter.put('/api/category/:id',authentication , categoryPut );
userRouter.patch('/api/category/:id',authentication , categoryPatch );
userRouter.delete('/api/category/:id',authentication , categoryDelete );


/* brand api router */
userRouter.get('/api/brand', brandGet);
userRouter.post('/api/brand',authentication , brandPost);
userRouter.put('/api/brand/:id',authentication , brandPut );
userRouter.patch('/api/brand/:id',authentication , brandPatch );

userRouter.delete('/api/brand/:id',authentication , brandDelete );

/* model api router */
userRouter.get('/api/model', modelGet);
userRouter.post('/api/model',authentication , modelPost);
// userRouter.put('/api/model/:id',authentication , upload.single('image') , modelPut );
userRouter.put('/api/model/:id',authentication , modelPut );
userRouter.delete('/api/model/:id',authentication , modelDelete );
userRouter.patch('/api/model/:id',authentication ,modelPatch );


userRouter.get('/api/brand-category/:category_id', filterWithCategoryGet);
userRouter.get('/api/brand-model/:brand_id', filterWithBrandGet);

userRouter.get('/api/model-search/:search', searchGet);




/* states api router */
userRouter.get('/api/state', statesGet);
userRouter.post('/api/state',authentication , statesPost);
userRouter.put('/api/state/:id',authentication , statesPut );
userRouter.patch('/api/state/:id',authentication , statesPatch );
userRouter.delete('/api/state/:id',authentication , statesDelete );

/* district api router */
userRouter.get('/api/district', districtGet);
userRouter.post('/api/district',authentication , districtPost);
userRouter.put('/api/district/:id',authentication , districtPut );
userRouter.patch('/api/district/:id',authentication , districtPatch );
userRouter.delete('/api/district/:id',authentication , districtDelete );


/* blocks api router */
userRouter.get('/api/blocks', blocksGet);
userRouter.post('/api/blocks',authentication , upload.single('image') , blocksPost);
userRouter.put('/api/blocks/:id',authentication , upload.single('image') , blocksPut );
userRouter.delete('/api/blocks/:id',authentication , blocksDelete );
userRouter.patch('/api/blocks/:id',authentication ,blocksPatch );

userRouter.get('/api/state-blocks/:state_id', filterWithStateGet);




/* category variation api router */
userRouter.get('/api/variation', variationGet);
userRouter.get('/api/variation-category/:category_id', variationCategoryGet);
userRouter.post('/api/variation',authentication , variationPost);
userRouter.put('/api/variation/:id',authentication , variationPut );
userRouter.delete('/api/variation/:id',authentication , variationDelete );

/* category variation types api router */
userRouter.get('/api/variation-type', variationTypeGet);
userRouter.get('/api/variation-type/:id', variationTypeGet);
userRouter.post('/api/variation-type',authentication , variationTypePost);
userRouter.put('/api/variation-type/:id',authentication , variationTypePut );
userRouter.delete('/api/variation-type/:id',authentication , variationTypeDelete );
userRouter.patch('/api/variation-type/:id',authentication ,variationTypePatch );





/* product api router */
userRouter.get('/api/product', productGet);
userRouter.post('/api/product',authentication, upload.single('image') , productPost);
userRouter.put('/api/product/:id',authentication, upload.single('image') , productPut );
userRouter.delete('/api/product/:id',authentication , productDelete );




/* readfiles api router */
userRouter.get('/api/gallery-system',authentication, readFile);
userRouter.post('/api/gallery-system',authentication , upload.single('image'), uploadFile);
userRouter.delete('/api/gallery-system/:filename',authentication, deleteFile);



module.exports = userRouter;