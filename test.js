const pr = require('./index.js')
const token = require('./token.json')

var input = {
  "url": "https://www.meytherwallet.co/",
  "description": "Added due to automated detection.",
  "category": "Phishing",
  "subcategory": "MyEtherWallet",
  "addresses": [
    '0x0000000000000000000000000000000000000000'
  ],
  "urlscanuuid": '9c2ff47f-d080-461a-a19a-577a050b7b35'
}
var start = async () => {
    output = pr(token.token, input)
    if( output.statuscode === 0 ) {
        console.log('Status: ' + output.statuscode)
        console.log(output.message);
    } else if( output.statuscode === 1 ) {
        console.log('Status: ' + output.statuscode)
        console.log(output.message);
    }
}

start();
