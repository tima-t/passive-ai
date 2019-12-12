import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    currencies = { DAI: '', ETH: '3', BAT: '3', USDC: '' }

    constructor(private _storage: Storage) {

    }

    async ngOnInit() {
        for (let currency in this.currencies) {
            this.currencies[currency] = await this._storage.get(currency);
        }
    }

}
