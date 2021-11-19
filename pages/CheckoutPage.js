import { Selector,t } from "testcafe";

class CheckoutPage{
    constructor(){
        this.country = Selector("#BillingNewAddress_CountryId")
        this.city = Selector("#BillingNewAddress_City")
        this.address = Selector("#BillingNewAddress_Address1")
        this.zipCode = Selector("#BillingNewAddress_ZipPostalCode")
        this.phoneNumber = Selector("#BillingNewAddress_PhoneNumber")
        this.addressContinueButton = Selector("button.button-1.new-address-next-step-button")
        this.shippingContinueButton = Selector("#shipping-method-buttons-container > button")
        this.paymentContinueButton = Selector("#payment-method-buttons-container > button")
        this.infoContinueButton = Selector("#payment-info-buttons-container > button")
        this.confirmButton = Selector("#confirm-order-buttons-container > button")
        this.confirmationMessage = Selector('strong').withText('Your order has been successfully processed!')
        this.viewOrderDetailsLink = Selector('a').withText('Click here for order details.')
    }

    async selectCountry(countryName){
        const CountryOption = this.country.find('option');
        await t
            .click(this.country)
            .click(CountryOption.withText(countryName));
    }
}

export default new CheckoutPage();