const Order = require("../modals/orderModals");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeature = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../modals/productModal");

// create order - admin
exports.createOrder = catchAsyncErrors( async (req,res,next) => {
    const {shippingInfo, orderItems,paymentInfo, ItemPrice,taxPrice, shippingPrice,totalPrice} = req.body;
    console.log(req.body);
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      ItemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt:Date.now(),
      user: req.user._id
    });
    console.log(order);

    res.status(201).json({
        success:true,
        order
    })
})

// get single order
exports.getSingleOrder = catchAsyncErrors( async (req,res,next) => {
    const order = await Order.findById(req.params.id).populate("user","name email");  // by using populate we can get name and email from user

    if(!order){
        return next(new ErrorHandler(`No order found with the id of ${req.params.id}` , 404));
    }

    res.status(200).json({
        success:true,
        order
    })

})

// get logged in user orders
exports.myOrders = catchAsyncErrors( async (req,res,next) => {
    const orders = await Order.find({user:req.user.id}); 

    res.status(200).json({
        success:true,
        orders
    })

})

// get all orders - admin
exports.getAllOrders = catchAsyncErrors( async (req,res,next) => {
    const orders = await Order.find(); 

    let totalAmount = 0;
    orders.forEach((order) => {totalAmount+=order.totalPrice} );

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })

})

async function upadateStock(id,quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}

// update orders status - admin
exports.updateOrderStatus = catchAsyncErrors( async (req,res,next) => {
    const order = await Order.findById(req.params.id); 
    if (!order) {
      return next(
        new ErrorHandler(`No order found with this id`, 404)
      );
    }

    if (order.orderStatus === "Delivered") {
        return next(
            new ErrorHandler("You have already delivered this order", 404)
            );
    }
    if(req.body.status === "Shipped"){
        order.orderItems.forEach( async (order) =>  {
            await upadateStock(order.product,order.quantity);
        });
    }
    
    
    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    
    await order.save({validateBeforeSave:false});
    
    res.status(200).json({
        success:true,
    })
    
})

// delete  orders - admin
exports.deleteOrder = catchAsyncErrors( async (req,res,next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(
        new ErrorHandler(`No order found with this id`, 404)
      );
    }
    await Order.deleteOne({_id:req.params.id});

    res.status(200).json({
        success:true,
    })

})
