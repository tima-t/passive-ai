import { ethers } from "ethers";
import { Injectable } from "@angular/core";
import Wallet from "ethers-wallet";
import { getAddressBalances } from 'eth-balance-checker/lib/ethers';

@Injectable({
    providedIn: "root"
})
export class EthersService {

    provider: any;
    initializedWallet: any;
    etherscanProvider: any;
    //Indexes of tokenAddresses and tokensNames should be the same
    tokensAddrresses: string[] = ['0x0000000000000000000000000000000000000000', '0x6b175474e89094c44da98b954eedeac495271d0f', '0x0d8775f648430679a709e98d2b0cb6250d2887ef', '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'];
    tokensNames: string[] = ['ETH', 'DAI', 'BAT', 'USDC'];

    constructor() {
        this.provider = ethers.getDefaultProvider();
        this.etherscanProvider = new ethers.providers.EtherscanProvider();
    }

    async generateBrainWallet(email: string, password: string) {
        console.log("brainWallet");
        let brainWallet = await Wallet.Wallet.fromBrainWallet(email, password);
        return brainWallet;
    }

    async initilaizeWallet(privateKey: string) {
        this.initializedWallet = new ethers.Wallet(privateKey, this.provider);
    }

    async getEthBalance() {
        let balance = await this.initializedWallet.getBalance();
        console.log("eth balance " + ':' + ethers.utils.formatEther(balance));
        return ethers.utils.formatEther(balance);
    }

    formatEth(amount) {
        return ethers.utils.formatEther(amount);
    }

    async getBalancesOfAddress(address: string) {
        let balances = await getAddressBalances(this.provider, address, this.tokensAddrresses);
        return balances;
    }

    getAddressesToSymbols() {
        let addressesToSymbols = {};
        for (let i = 0; i <= this.tokensAddrresses.length; i++) {
            addressesToSymbols[this.tokensAddrresses[i]] = this.tokensNames[i];
        }

        return addressesToSymbols;
    }

    async getWalletHistory(address) {
        this.etherscanProvider.getHistory(address).then((history) => {
            history.forEach((tx) => {
                console.log(tx);
            })
        });
    }

}
