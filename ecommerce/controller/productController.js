import slugify from "slugify";
import productModel from "../model/productModel.js";
import fs from "fs";
//import UpdateProduct from "../client/src/pages/admin/UpdateProduct.jsx";
//import WorkProduct from "../client/src/pages/admin/WorkProduct.jsx";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ message: "name is requires" });
      case !description:
        return res.status(400).send({ message: "description is requires" });
      case !category:
        return res.status(400).send({ message: "category is requires" });
      case !price:
        return res.status(400).send({ message: "price is requires" });
      case !quantity:
        return res.status(400).send({ message: "quantity is requires" });
      case !photo && photo.size > 1000000:
        return res.status(400).send({
          message: "photo is requires and size should be less than 1 mb",
        });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "product added successfully....",
      product,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "error while adding product",
      error,
    });
  }
};

//get all products

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .select("-photo")
      .limit(12)
      .populate('category')
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "List of all products",
      products,
      total: products.length,
    });
  } catch (error) {
    res.status(200).send({
      success: true,
      message: "error while getting products",
      error,
    });
  }
};

//single product
export const singleProductController = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await productModel
      .findOne({ _id })
      .select("-photo")
      .populate('category');

    res.status(200).send({
      success: true,
      message: "List of single product",
      product,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "error while getting single product....!",
      error,
    });
  }
};

//get photo product
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params._id).select('photo')
    if (product.photo.data) {
      res.set('Content-Type', product.photo.contentType);
      return res.status(200).send(
        product.photo.data
      )
    }

  } catch (error) {
    res.status(200).send({
      message: true,
      success: "error while getting photo.....",
      error
    })
  }
}

//get delete product
export const deleteProductController = async (req, res) => {
  try {
    const { _id } = req.params
    await productModel.findByIdAndDelete({ _id })
    res.status(200).send({
      success: true,
      message: "successfully deleted"
    })
  } catch (error) {
    res.status(400).send({
      success: true,
      message: "error while deleting product",
      error
    })
  }
}
//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation


    const product = await productModel.findByIdAndUpdate(req.params._id,
      { ...req.fields, slug: slugify(name) }, { new: true })

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save()
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while updating product..",
      error,
    });
  }

}

//filters
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const agrs = {};
    if (checked.length > 0) {
      agrs.category = checked;
    }
    if (radio.length) {
      agrs.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await productModel.find(agrs).populate('category', 'name');
    res.status(200).send({
      succes: true,
      products
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while filtering products",
      error
    })
  }
}

//product count

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total

    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while  in product count...",
      error
    })
  }
}

//product list

export const productListController = async (req, res) => {
  try {
    const perPage = 5;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({}).populate('category', 'name')
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while getting her",
      error
    })
  }
}


//search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },// case insensitive
        { description: { $regex: keyword, $options: "i" } },
      ]
    }).select("-photo");

    res.status(200).send({
      results
    })

    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while searching a product",
      error
    })
  }
}





//   try {
//     const {_id}=req.params
//     await productModel.findByIdAndUpdate({_id})
//     res.status(200).send({
//       success:true,
//       message:"successfully updated!!"
//     })
//   } catch (error) {
//     res.status(400).send({
//       success:true,
//       message:"update product ",
//       error
//     })
//   }
//   }

// get update product