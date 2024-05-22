const SellerProduct = require('../models/sellerProductModel');
const cloudinary = require('../utils/cloudinary');
const ErrorResponse = require('../utils/errorResponse');

exports.createSellerProduct = async (req, res, next) => {
  const { name, description, price, image } = req.body;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "sellerProducts",
      width: 1200,
      crop: "scale"
    });

    const sellerProduct = await SellerProduct.create({
      name,
      description,
      price,
      postedBy: req.user._id,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      }
    });

    res.status(201).json({
      success: true,
      sellerProduct
    });
  } catch (error) {
    next(error);
  }
};

exports.getSellerProducts = async (req, res, next) => {
  try {
    const sellerProducts = await SellerProduct.find().sort({ createdAt: -1 }).populate('postedBy', 'name');
    res.status(200).json({
      success: true,
      sellerProducts
    });
  } catch (error) {
    next(error);
  }
};

exports.getSellerProductById = async (req, res, next) => {
  try {
    const sellerProduct = await SellerProduct.findById(req.params.id).populate('postedBy', 'name');
    if (!sellerProduct) {
      return next(new ErrorResponse('Product not found', 404));
    }
    res.status(200).json({
      success: true,
      sellerProduct
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSellerProduct = async (req, res, next) => {
  try {
    const sellerProduct = await SellerProduct.findById(req.params.id);
    if (!sellerProduct) {
      return next(new ErrorResponse('Product not found', 404));
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(sellerProduct.image.public_id);

    await sellerProduct.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted"
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSellerProduct = async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body;
    const sellerProduct = await SellerProduct.findById(req.params.id);

    if (!sellerProduct) {
      return next(new ErrorResponse('Product not found', 404));
    }

    // Build the updated data object
    const data = {
      name: name || sellerProduct.name,
      description: description || sellerProduct.description,
      price: price || sellerProduct.price,
    };

    // Update image if a new one is provided
    if (image !== '') {
      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(sellerProduct.image.public_id);

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: 'sellerProducts',
        width: 1200,
        crop: "scale"
      });

      data.image = {
        public_id: result.public_id,
        url: result.secure_url
      };
    }

    const updatedSellerProduct = await SellerProduct.findByIdAndUpdate(req.params.id, data, { new: true });

    res.status(200).json({
      success: true,
      sellerProduct: updatedSellerProduct
    });
  } catch (error) {
    next(error);
  }
};
