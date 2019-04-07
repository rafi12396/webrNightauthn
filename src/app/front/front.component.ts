import { Component, OnInit } from '@angular/core';
import base64url from 'base64url';
import { Hero } from '../hero';
'use strict';

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
      

// let clientDataJSON = 'eyJjaGFsbGVuZ2UiOiJJSFdtWjFPa1MydDZLaHZYLWtvTnh1dGtZdU1WRXVuQ2pZTlNYWGdBeHZVIiwibmV3X2tleXNfbWF5X2JlX2FkZGVkX2hlcmUiOiJkbyBub3QgY29tcGFyZSBjbGllbnREYXRhSlNPTiBhZ2FpbnN0IGEgdGVtcGxhdGUuIFNlZSBodHRwczovL2dvby5nbC95YWJQZXgiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIn0';
// let clientData     = JSON.parse(base64url.decode(clientDataJSON));
// console.log(clientData);
 
      
      console.log(typeof newCredentialInfo);
      const typedArray = new Uint8Array(newCredentialInfo.response.clientDataJSON);
      Array.from(typedArray);

      var stringtA = new TextDecoder("utf-8").decode(typedArray);
      console.log(stringtA)
      console.log(typedArray);
      console.log(JSON.parse(stringtA));


      const typedArray1 = new Uint8Array(newCredentialInfo.response.attestationObject);
      Array.from(typedArray1);

      var stringtA1 = new TextDecoder("utf-8").decode(typedArray1);
      console.log(typedArray1);
      console.log(stringtA1);


      var idList = [{
        id: newCredentialInfo.rawId,
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
