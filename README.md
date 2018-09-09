# ESDB-AutoPR
AutoPullRequest Data for EtherScamDB

This is based on previous work by [MrLuit](https://github.com/mrluit) in [esdb-cli](https://github.com/mrluit/esdb-cli)

###### To install:
`npm i esdb-autopr`


###### To use:
```
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
        console.log(output.message);    }
    else if( output.statuscode === 1 ) {
        console.log('Status: ' + output.statuscode)
        console.log(output.message);
    }
}
start()

```

Example token.json:
```
{
  "token":"github-access-token",
  "urlscan-api-key": "urlscan-api-key"
}
```


Example input:
```
// Input Data: url field is required. Other fields are not.
{
  "url": "https://www.myaetherwalet.com/",
  "description": "Added due to automated detection.",
  "category": "Phishing",
  "subcategory": "MyEtherWallet",
  "addresses": [
    '0x0000000000000000000000000000000000000000'
  ],
  "urlscanuuid": '259507d0-8136-4db3-ad3e-7723eee69217'
}
```
