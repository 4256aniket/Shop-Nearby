const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec()
    .then((order) => {
      req.order = order;
      next();
    })
    .catch((err) => {
      res.status(400).json({
        error: "No order found in DB",
      });
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order
    .save()
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Failed to save your order in DB",
      });
    });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      res.status(400).json({
        error: "No orders found in DB",
      });
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } })
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Cannot update order status",
      });
    });
};
