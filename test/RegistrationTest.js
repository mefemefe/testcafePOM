import {ClientFunction} from 'testcafe';
import homepage from '../pages/HomePage.js';
import registerpage from '../pages/RegisterPage.js';
import loginpage from '../pages/LoginPage.js';
import customerpage from '../pages/CustomerPage.js';

const dataSet = require('../data/data.json');
const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var userEmail = 'hola'+randomNumber+'@chau.com';

fixture("Registration Fixture")
    .page(URL);

test('Assert Home Page Test', async t => {
    await t
        .expect(getURL()).eql(URL)
        .takeScreenshot()
        .expect(homepage.subTitleHeader.exists).ok();
});

dataSet.forEach(data => {
test('User Registration and Login Test', async t => {
    await t
        .maximizeWindow()
        .click(homepage.registerLink)
        .expect(getURL()).contains('register')
        .click(registerpage.GenderOption)
        .typeText(registerpage.FirstName, data.firstname)
        .typeText(registerpage.LastName, data.lastname);
    
    await registerpage.selectDay(data.birthday);
    await registerpage.selectMonth(data.birthmonth);
    await registerpage.selectYear(data.birthyear);
    await t
        .typeText(registerpage.Email, userEmail)
        .typeText(registerpage.Password, data.password)
        .typeText(registerpage.ConfirmPassword, data.password)
        .click(registerpage.RegisterButton)
        .expect(registerpage.SuccessfulMessage.exists).ok()
        // Logout
        .click(homepage.logoutLink)
        // Login with the registered account
        .click(homepage.loginLink)
        .expect(loginpage.accountHeader.exists).ok()
        .typeText(loginpage.emailInput, userEmail)
        .typeText(loginpage.passwordInput, data.password)
        .click(loginpage.submitButton)
        // Go to my account page
        .click(homepage.myAccountLink)
        // Check "Orders" are displayed
        .expect(customerpage.ordersLink.exists).ok()
        .click(customerpage.ordersLink)
        .expect(customerpage.noOrderslabel.exists).ok()
        .takeScreenshot();
})});