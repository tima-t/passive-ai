import { Component } from '@angular/core';
import { EthersService } from '../services/ethers.service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    constructor(private _ethersSerive: EthersService, private _storage: Storage) {
    }

    async ngOnInit() {
        let prKey = await this._storage.get('privateKey');
        this._ethersSerive.initilaizeWallet(prKey);
    }
}
