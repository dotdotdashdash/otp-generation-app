# otp-generation-app
A simple app to generate a 6-digit otp and send to a contact number
You can navigate to contacts page and message page from the home dashboard
* Contacts page: 
	* List of all added contacts.
	* Search field to filter contacts
	* Add contacts button with 2 sub menus - import from json file and add manually
	* import from json open files window to choose a json file - please make sure your json file contain fields with keys firstName, lastName, email, phone - all in string format
	* Click on a row to open the individual contacts page
	* View the contact details and message history of the particular contact here
	* Click send message to send a new message with OTP
	* A sheet with a message pops up - can be edited if needed
	* Confirm to send message
* Messages page:
	* Message listing page with all messages sent
	
-- Run npm install inside both client and server before first run
-- Modules used:
	Express
	Mongoose
	twilio - to send sms
	cors
	dotenv
