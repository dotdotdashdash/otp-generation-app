const contactModel = require('../models/contact-model');

const accountSid = process.env.TWILIO_ACCOUNT_SID; // twilio credentials are stored as environment variables
const authToken = process.env.TWILIO_AUTH_TOKEN;

module.exports.sendSms = (phoneNumber, messageBody)=> {

  const client = require('twilio')(accountSid, authToken);  //using the trilio package provided by trilio.com for sending messages
  return client.messages // return the status of sending message
    .create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    })
    .then((responseData) => { // handling the response - success & error
      return {
        success: true,
        message: 'Message Successfully Sent',
        data: responseData
      };
    })
    .catch((errorData)=> {
      return {
        success: false,
        message: 'Message Sending Failed',
        data: errorData
      };
    });

}

module.exports.updateSentOtpInfo = async (contactData, messageStatus)=> {
  let message = {
    messageBody: messageStatus.data.body,
    sentTime: messageStatus.data.dateUpdated,
    otp: contactData.otp
  }
  
  return await contactModel.findByIdAndUpdate(contactData.contactId, {
    $push: {
      communicationInfo: { otpMessages: message }
    }
  }, { new: true })
  .then((responseData)=> {
    return {
      success: true,
      data: responseData
    }
  })
  .catch((errorData)=> {
    return {
      success: false,
      data: errorData
    }
  });
}
