import { ClientFunction } from "testcafe";

import homepage from "../pages/HomePage";
import registerpage from "../pages/RegisterPage";
import searchresults from "../pages/SearchResultPage";
import productdetails from "../pages/ProductDetailsPage";
import cartpage from "../pages/CartPage";
import checkoutpage from "../pages/CheckoutPage";
import myorderpage from "../pages/CustomerPage";

const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var userEmail = "hola" + randomNumber + "@chau.com";

fixture("E2E Fixture")
    .page(URL);

test("Assert home page", async (t) => {
    await t
        .expect(getURL()).eql(URL)
        .takeScreenshot()
        .expect(homepage.subTitleHeader.exists).ok();
});

test("Place Order E2E Tests", async (t) => {
    await t
        .maximizeWindow()
        .click(homepage.registerLink)
        .expect(getURL()).contains('register')
        .click(registerpage.GenderOption)
        .typeText(registerpage.FirstName, 'Mefe')
        .typeText(registerpage.LastName, 'Mefe')
        .typeText(registerpage.Email, userEmail)
        .typeText(registerpage.Password, '123456')
        .typeText(registerpage.ConfirmPassword, '123456')
        .click(registerpage.RegisterButton)
        .expect(registerpage.SuccessfulMessage.exists).ok();
        await homepage.search('Apple MacBook Pro 13-inch');
        await t
            //Search
            .click(searchresults.productTitle)
            .expect(getURL()).contains('apple-macbook-pro-13-inch')
            .expect(productdetails.productPrice.exists).ok()
            // Qty and Add
            .selectText(productdetails.productQuantity).pressKey('delete')
            .typeText(productdetails.productQuantity, '3')
            .click(productdetails.addToCart)
            .expect(productdetails.successMessage.exists).ok()
            .wait(2000)
            // Cart and checkout
            .click(homepage.cartLink)
            .click(cartpage.termsLabel)
            .click(cartpage.checkoutButton)
            .expect(getURL()).contains('checkout');
        await checkoutpage.selectCountry('Argentina');
        await t
            .takeScreenshot()
            .typeText(checkoutpage.city, 'Buenos Aires')
            .typeText(checkoutpage.address, 'Av. Siempre Viva 123')
            .typeText(checkoutpage.zipCode, '1000')
            .typeText(checkoutpage.phoneNumber, '3324343453')
            .click(checkoutpage.addressContinueButton)
            .click(checkoutpage.shippingContinueButton)
            .click(checkoutpage.paymentContinueButton)
            .click(checkoutpage.infoContinueButton)
            .click(checkoutpage.confirmButton)
            .expect(checkoutpage.confirmationMessage.exists).ok()
            .click(checkoutpage.viewOrderDetailsLink)
            // My Account
            .click(homepage.myAccountLink)
            .click(myorderpage.ordersLink);
});

test("Change Currency Test", async (t) => {
    await homepage.changeCurrency('Euro');
    await t
        .takeScreenshot()
})
