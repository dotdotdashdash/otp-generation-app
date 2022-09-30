const express = require(`express`);
const contactModel = require("../models/contact-model");

const messageRouter = express.Router();

messageRouter.get(`/getmessages`, (req, res)=> {
  console.log('re');

  contactModel.aggregate([
    {
      $match : { "communicationInfo.otpMessages": { $exists: true }}
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        phone: 1,
        communicationInfo: { otpMessages: 1 }
      }
    },
    {
      $unwind: "$communicationInfo"
    }
  ])
    .then((responseData)=> {
      res.status(200).json({
        success: true,
        data: responseData
      });
    })
    .catch((errorData)=> {
      console.log(errorData.message);
      res.status(200).json({
        success: false,
        data: errorData.message
      });
    })
});

module.exports = messageRouter;