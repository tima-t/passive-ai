import { Component } from '@angular/core';
import {EthersService} from '../services/ethers.service';
import { Storage } from '@ionic/storage';
// import { ethers } from 'ethers';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  passwordError: string = "";
  emailError: string = "";
  address:string = "";
  privateKey:string = "";
  balances: any = {};
  addressesToSymbols: any = {}


  constructor( private _ethersSerive: EthersService, private _storage: Storage) {
  }

  async createWallet(email, password, confirmPassword){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail = re.test(String(email).toLowerCase());
    //TODO validations and flag for mistake

    // 1 Email validation
    if(!validEmail){
        this.emailError = "Invalid Email";
        this.email = "";
        return 0;
    }

    // 2 check if password and confirm password are the same
    else if(password !== confirmPassword){
        this.password = "";
        this.confirmPassword = "";
        this.passwordError = "Passwords do not match";
        return 0;
    }

    // 3 Lenght validation for passwords
    else if(password.length < 8){
        this.password = "";
        this.confirmPassword = "";
        this.passwordError = "Password is too short";
        return 0;
    }

    let result = await this._ethersSerive.generateBrainWallet(email, password);
    this.address = result.address;
    this.privateKey = result.private;

    this._storage.set("address", result.address);
    this._storage.set("privateKey", result.privateKey);

    // initialize wallet
    await this._ethersSerive.initilaizeWallet(result.privateKey);

    // Get balances
    this.formatBalances();    
  }

  async ngOnInit(){
    this.address = await this._storage.get('address');
    this.addressesToSymbols = this._ethersSerive.getAddressesToSymbols();
    console.log(this.addressesToSymbols);
    //If wallet is available
    if (this.address){
        this.privateKey = await this._storage.get('privateKey');
        await this._ethersSerive.initilaizeWallet(this.privateKey);


        // Get balances
        this.formatBalances(); 
    }
    else{
        this.balances.DAI = 0;
        this.balances.ETH = 0;
        this.balances.BAT = 0;
        this.balances.USDC = 0;
    }
  }

  async formatBalances(){
    console.log(this.addressesToSymbols);
    let balances = await this._ethersSerive.getBalancesOfAddress(this.address);
    for ( let balanceIndex in balances){
        this.balances[this.addressesToSymbols[balanceIndex]] = this._ethersSerive.formatEth(balances[balanceIndex]);
        this._storage.set(this.addressesToSymbols[balanceIndex], this._ethersSerive.formatEth(balances[balanceIndex]));
    }
  }
}
