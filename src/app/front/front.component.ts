import { Component, OnInit } from '@angular/core';
import base64url from 'base64url';
import { Hero } from '../hero';
import cbor from 'cbor';




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
    const cbor      = require('cbor');
    
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
      let enc = new TextDecoder("utf-8");
      let clientDataJSON = enc.decode(newCredentialInfo.response.clientDataJSON);

      console.log(clientDataJSON);
      
       let clientData     = JSON.parse(clientDataJSON);
       console.log(clientData);

      //  let attstnJSON = enc.decode(newCredentialInfo.response.attestationObject);
      //  console.log(attstnJSON);

      // const cbor      = require('cbor');
      // let attestationObject       = 'o2NmbXRoZmlkby11MmZnYXR0U3RtdKJjc2lnWEYwRAIgRvfOaUcMVmHqrKzXSH2Inb4PIshESObwuPrtTS_W3RMCICF_qfvwZhDRF8bqiNGYty2iXcOxY8Tgi7TgQJHZqi4wY3g1Y4FZAlMwggJPMIIBN6ADAgECAgQ8aClNMA0GCSqGSIb3DQEBCwUAMC4xLDAqBgNVBAMTI1l1YmljbyBVMkYgUm9vdCBDQSBTZXJpYWwgNDU3MjAwNjMxMCAXDTE0MDgwMTAwMDAwMFoYDzIwNTAwOTA0MDAwMDAwWjAxMS8wLQYDVQQDDCZZdWJpY28gVTJGIEVFIFNlcmlhbCAyMzkyNTczNDgxMTExNzkwMTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABL3fZ5Pbd5TDUDFx7SxNRUrZc2Z1Gki6pdn5tWo6IIF5a07fK817knoUkxD7xGhHb_xXkql9ti-gKGvGoyACDmOjOzA5MCIGCSsGAQQBgsQKAgQVMS4zLjYuMS40LjEuNDE0ODIuMS41MBMGCysGAQQBguUcAgEBBAQDAgUgMA0GCSqGSIb3DQEBCwUAA4IBAQCqwA1RCX7sFaSGs3m8xINA-GfTly7Oamf7pHDjYMZEWfCtOELT_wgeceqJU5cbI_klwK0AwkcxGFIG8LOpGSn7kbdmtT_hM1Iqg1i40SC0q_t_6O8ke2T_xqYhSsHZvnM2_eDzqBg_k0tSGHX14_eJgK-XClseBCo4dtdLqL7v6S3S43PMZEHIlK182aT0fa09pP6vR5GYR1PjWgic5Mvj08g26tCip86lYVrX5EgQhsN3s2ZE0vuZa7zimyGtuJX3k4LuxUk-TsEzwhZ_B3H1mTFzEg_yjVPogaiXQMEyzzw0aCy7z05dvcHggCIfh1KZgUHdFJbXDzqwPyxbwH-taGF1dGhEYXRhWMRJlg3liA6MaHQ0Fw9kdmBbj-SuuaKGMseZXPO6gx2XY0EAAAAAAAAAAAAAAAAAAAAAAAAAAABAimCIoe8U_N9M1rTGeCqJ96TAu5uqSPa7YUzdh7qq-AdJlnBl8NwCpu2-sNj9UIVH5rAjX_RXlSGTGWKexKIZXKUBAgMmIAEhWCB7XpGVxTYo6jtkxB7sBR4Af_YM0GvInN5V7IvUIilN2yJYINphegJ6kNET_VIp0QOxssW8xxUFEgg5ic3HXmoGg4fS';
      // let attestationObjectBuffer = base64url.toBuffer(newCredentialInfo.response.attestationObject);
      // console.log(attestationObjectBuffer);
      // let ctapMakeCredResp        = cbor.decodeAllSync(attestationObjectBuffer)[0];

      // console.log(ctapMakeCredResp);




      // const cbor      = require('cbor');


      // //let attestationObject       = 'o2NmbXRoZmlkby11MmZnYXR0U3RtdKJjc2lnWEYwRAIgRvfOaUcMVmHqrKzXSH2Inb4PIshESObwuPrtTS_W3RMCICF_qfvwZhDRF8bqiNGYty2iXcOxY8Tgi7TgQJHZqi4wY3g1Y4FZAlMwggJPMIIBN6ADAgECAgQ8aClNMA0GCSqGSIb3DQEBCwUAMC4xLDAqBgNVBAMTI1l1YmljbyBVMkYgUm9vdCBDQSBTZXJpYWwgNDU3MjAwNjMxMCAXDTE0MDgwMTAwMDAwMFoYDzIwNTAwOTA0MDAwMDAwWjAxMS8wLQYDVQQDDCZZdWJpY28gVTJGIEVFIFNlcmlhbCAyMzkyNTczNDgxMTExNzkwMTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABL3fZ5Pbd5TDUDFx7SxNRUrZc2Z1Gki6pdn5tWo6IIF5a07fK817knoUkxD7xGhHb_xXkql9ti-gKGvGoyACDmOjOzA5MCIGCSsGAQQBgsQKAgQVMS4zLjYuMS40LjEuNDE0ODIuMS41MBMGCysGAQQBguUcAgEBBAQDAgUgMA0GCSqGSIb3DQEBCwUAA4IBAQCqwA1RCX7sFaSGs3m8xINA-GfTly7Oamf7pHDjYMZEWfCtOELT_wgeceqJU5cbI_klwK0AwkcxGFIG8LOpGSn7kbdmtT_hM1Iqg1i40SC0q_t_6O8ke2T_xqYhSsHZvnM2_eDzqBg_k0tSGHX14_eJgK-XClseBCo4dtdLqL7v6S3S43PMZEHIlK182aT0fa09pP6vR5GYR1PjWgic5Mvj08g26tCip86lYVrX5EgQhsN3s2ZE0vuZa7zimyGtuJX3k4LuxUk-TsEzwhZ_B3H1mTFzEg_yjVPogaiXQMEyzzw0aCy7z05dvcHggCIfh1KZgUHdFJbXDzqwPyxbwH-taGF1dGhEYXRhWMRJlg3liA6MaHQ0Fw9kdmBbj-SuuaKGMseZXPO6gx2XY0EAAAAAAAAAAAAAAAAAAAAAAAAAAABAimCIoe8U_N9M1rTGeCqJ96TAu5uqSPa7YUzdh7qq-AdJlnBl8NwCpu2-sNj9UIVH5rAjX_RXlSGTGWKexKIZXKUBAgMmIAEhWCB7XpGVxTYo6jtkxB7sBR4Af_YM0GvInN5V7IvUIilN2yJYINphegJ6kNET_VIp0QOxssW8xxUFEgg5ic3HXmoGg4fS';
      // //let attestationObjectBuffer = base64url.toBuffer(attstnJSON);
      // let ctapMakeCredResp        = cbor.decodeAllSync(newCredentialInfo.response.attestationObject)[0];

      // console.log(ctapMakeCredResp);

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
