import { Component, OnInit } from '@angular/core';
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

   }

  ngOnInit() {
    
    
  }

  log(val) { console.log(val); }
  

  onSign() {

    this.navgtr=window.navigator;
    let challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);

    let publicKey = {
      challenge: challenge,
  
      allowCredentials: [
          { type: "public-key", id: this.tempCredentialInfo.CredID }
      ]
  }
  
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


  onReg() {
    this.navgtr=window.navigator;

let challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);

this.userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw='
let id = Uint8Array.from(window.atob(this.userID), c=>c.charCodeAt(0))
console.log(id)
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
    ]
}

this.navgtr.credentials.create({ 'publicKey': publicKey })
    .then((newCredentialInfo) => {
        this.tempCredentialInfo=newCredentialInfo;
        console.log('SUCCESS', newCredentialInfo);
        alert(JSON.stringify(newCredentialInfo));
        
    })
    .catch((error) => {
        console.log('FAIL', error)
    })

  }

}
