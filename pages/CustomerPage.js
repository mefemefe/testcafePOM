import {Selector,t} from 'testcafe';

class CustomerPage {
    constructor(){
        this.ordersLink = Selector('a').withText('Orders');
        this.noOrderslabel = Selector('div.no-data').withText('No orders');
    }

}

export default new CustomerPage();