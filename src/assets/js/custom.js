function onClickReg() {

    var challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);

var userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw='
var id = Uint8Array.from(window.atob(userID), c=>c.charCodeAt(0))

var publicKey = {
    'challenge': challenge,

    'rp': {
        'name': 'Example Inc.'
    },

    'user': {
        'id': id,
        'name': 'alice@example.com',
        'displayName': 'Alice Liddell'
    },

    'pubKeyCredParams': [
        { 'type': 'public-key', 'alg': -7  },
        { 'type': 'public-key', 'alg': -257 }
    ]
}

navigator.credentials.create({ 'publicKey': publicKey })
    .then((newCredentialInfo) => {
        console.log('SUCCESS', newCredentialInfo)

        const base64url  = require('base64url');

let clientDataJSON = 'eyJjaGFsbGVuZ2UiOiJJSFdtWjFPa1MydDZLaHZYLWtvTnh1dGtZdU1WRXVuQ2pZTlNYWGdBeHZVIiwibmV3X2tleXNfbWF5X2JlX2FkZGVkX2hlcmUiOiJkbyBub3QgY29tcGFyZSBjbGllbnREYXRhSlNPTiBhZ2FpbnN0IGEgdGVtcGxhdGUuIFNlZSBodHRwczovL2dvby5nbC95YWJQZXgiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIn0';
let clientData     = JSON.parse(base64url.decode(clientDataJSON));

console.log(clientData);

    })
    .catch((error) => {
        console.log('FAIL', error)
    })
}

function onClickSign() {

    var challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    var publicKey = {
        challenge: challenge,
    
        allowCredentials: [
            { type: "public-key", id: credentialId }
        ]
    }
    
    navigator.credentials.get({ 'publicKey': publicKey })
      .then((getAssertionResponse) => {
          alert('SUCCESSFULLY GOT AN ASSERTION! Open your browser console!')
          console.log('SUCCESSFULLY GOT AN ASSERTION!', getAssertionResponse)
      })
      .catch((error) => {
          alert('Open your browser console!')
          console.log('FAIL', error)
      })
}