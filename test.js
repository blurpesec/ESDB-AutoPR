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
    var output = await pr(token.token, input)
    console.log( JSON.stringify( output, null, 2 ) )
}

start();
