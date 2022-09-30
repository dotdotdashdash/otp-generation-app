const express = require(`express`);
const { sendSms, updateSentOtpInfo } = require("../controllers/contacts-controller");
const contactModel = require("../models/contact-model");

const contactsRouter = express.Router();

contactsRouter.get(``, (req, res)=> {
  res.json({
    success: true,
    message: 'Hi'
  });
});

contactsRouter.post(`/insertcontacts`, (req, res)=> {

  contactModel.insertMany(req.body)
    .then((responseData)=> {
      res.status(200).json({
        success: true,
        message: `Successfully added new contacts from JSON file!`
      });
    })
    .catch((errorData)=> {
      console.log(`Error on saving contacts`, errorData.message)
    });

});

contactsRouter.post(`/addcontact`, (req, res)=> {
  req.body.phone = '+91' + req.body.phone;

  let newContact = new contactModel(req.body);

  newContact.save()
    .then((responseData)=> {
      res.status(200).json({
        success: true,
        message: `New contact added successfully`
      });
    })
    .catch((errorData=> {
      res.status(500).json({
        success: false,
        message: `New contact addition failed`
      });
    }));
});

contactsRouter.get(`/getcontacts`, (req, res)=> {
  
  contactModel.find({ })
    .then((contacts)=> {
      res.status(200).json({
        success: true,
        data: contacts
      });
    })
    .catch((err)=> {
      console.log('Contacts fetching failed', err.name);
      res.json({
        success: false,
        message: `contacts fetching failed, ${err.name}`
      });
    });

});

contactsRouter.get(`/getcontact/:contactId`, (req, res)=> {
  contactModel.findById(req.params.contactId)
    .then((contactData)=> {
      res.status(200).json({
        success: true,
        data: contactData
      });
    })
    .catch((errorData)=> {
      res.json({
        success: false,
        message: `Failed fetching contact data, ${errorData.name}`
      });
    });
});

contactsRouter.post(`/sendmessage`, async (req, res)=> {

  let messageSentStatus = await sendSms(req.body.phone, req.body.messageContent); // Pass the data to sendSms function and await for the response from twilio

  if(!messageSentStatus.success) { // If message sending failed, notify client
    console.log(`Sending Message Failed-->`, messageSentStatus.data)
    res.status(400).json(messageSentStatus)
  } else {
    updateSentOtpInfo(req.body, messageSentStatus) // Push the message receiver data nd message send status to db
      .then((responseData)=> {
        if(responseData.success) {
          console.log(`OTP message sent successfully and saved to DB`);
          res.status(200).json({
            success: true,
            message: `OTP message sent and saved`
          });
        } else {
        console.log(`Saving Message Info Failed`, responseData.data.message)
        res.status(500).json(responseData)
        }
      })
      .catch((errorData)=> {
        console.log(`Saving Message Info Failed`, errorData.message)
        res.status(500).json({
          success: false,
          data: errorData
        })
      });
  }

});

module.exports = contactsRouter;