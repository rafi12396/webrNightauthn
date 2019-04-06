import { Component, OnInit } from '@angular/core';
import base64url from 'base64url';
import { Hero } from '../hero';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {
    
  globalId:any;
  navgtr:any;
  userID:any;
  returnedJSON:string;
  per=new Hero();
    tempCredentialInfo:any;
  perData = new Array(4);
  
  constructor() {

    const base64url  = require('base64url');

   }

  ngOnInit() {
    
    
  }


  onSign() {

    console.log(this.per.authenticators);
    this.navgtr=window.navigator;
    let challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);

    let publicKey = {
      challenge: challenge,
  
      allowCredentials:this.per.authenticators
  }
  console.log(publicKey);
  
  this.navgtr.credentials.get({ 'publicKey': publicKey })
    .then((getAssertionResponse) => {
        alert('SUCCESSFULLY GOT AN ASSERTION! Open your browser console!')
        console.log('SUCCESSFULLY GOT AN ASSERTION!', getAssertionResponse)
    })
    .catch((error) => {
        alert('Open your browser console!')
        console.log('FAIL', error)
    })

  }

   ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  onReg() {
  this.navgtr=window.navigator;

let challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);

let id=new Uint8Array(32);
console.log(this.userID);
this.globalId=id;
let publicKey = {
    'challenge': challenge,

    'rp': {
        'name': 'Random Inc.'
    },

    'user': {
        'id': id,
        'name': 'abc@xyz.com',
        'displayName': 'abc xyz'
    },

    'pubKeyCredParams': [
        { 'type': 'public-key', 'alg': -7  },
        { 'type': 'public-key', 'alg': -257 }
    ],
    attestation : "direct"
}

this.navgtr.credentials.create({ 'publicKey': publicKey })
    .then((newCredentialInfo) => {
      
      let clientData     = JSON.parse(base64url.decode(newCredentialInfo.response.clientDataJSON));


      var idList = [{
        id: newCredentialInfo.id,
        type: "public-key"
    }];
        this.per.authenticators.push(idList);
        console.log('SUCCESS', newCredentialInfo);
        console.log(newCredentialInfo.response.attestationObject["[[Uint8Array]]"]);
        
    })
    .catch((error) => {
        console.log('FAIL', error)
    })

  }

}
