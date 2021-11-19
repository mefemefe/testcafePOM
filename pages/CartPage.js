import { Selector } from "testcafe";

class CartPage{
    constructor(){
        this.termsLabel = Selector('input#termsofservice')
        this.cartTotal = Selector('td.cart-total-right')
        this.checkoutButton = Selector('#checkout')
    }
}

export default new CartPage();