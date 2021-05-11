const fetch = require('node-fetch');
var colors = require('colors');
const config = require('./config.json')
const prompt = require('prompt-sync')();
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(config.webhook);

const orderid = prompt("Please enter your order number: ".yellow);
const zip = prompt("Please enter your zip code: ".yellow);

const url = 'https://www.dickssportinggoods.com/myaccount/services/redirectingservice/orderservice/v2/orders/' + orderid + '?billingZip=' + zip + '&chain=dsg';

const options = {
    method: "GET",
}

fetch(url, options)
  .then((res) => { 
    status_code = res.status; 
    return res.json()
})
.then((jsonData) => {
console.log(status_code);
status = (jsonData.status);

const embed = new MessageBuilder()
  .setTitle('Successfully Found Order :partying_face:')
  .setDescription("Order Placed at: " + jsonData.placedDate)
  .addField('Status', jsonData.status, true)
  .addField('Order Number', '||' + jsonData.orderNumber + '||', true)
  .addField('Tracking Number', '||' + jsonData.trackingNumber + '||', true)
  .addField('Tracking Link', '||' + jsonData.trackingUrl + '||', true)
  .setColor('#03fc13')
  .setFooter('Made by Rav3N#1509')
  .setTimestamp();
  hook.send(embed);

  if (status_code == 200) {
    console.log("Found Order".green)
  }
})
.catch((err) => {
  console.error(err);
});