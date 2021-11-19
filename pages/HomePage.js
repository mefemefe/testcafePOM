import { Selector, t } from "testcafe";

class HomePage {

    constructor() {
        this.subTitleHeader = Selector("h2").withText("Welcome to our store")
        this.registerLink = Selector("a").withText(/register/i)
        this.myAccountLink = Selector("a").withText(/My Account/i)
        this.logoutLink = Selector("a").withText(/Log out/i)
        this.loginLink = Selector("a").withText(/Log in/i)
        this.cartLink = Selector("a").withText(/Shopping cart/i)
        this.currencyList = Selector("select#customerCurrency");
    }

    get productSearch(){
        return Selector("input[id='small-searchterms']");
    }

    async search(product){
        await t
        .typeText(this.productSearch, product)
        .wait(3000)
        .pressKey("enter");
    }

    async changeCurrency(currency){
        await t
            .click(this.currencyList)
            .click(Selector('option', {text: currency}));
    }

}

export default new HomePage();