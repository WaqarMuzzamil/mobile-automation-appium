import { expect } from '@wdio/globals'
import LoginPage from '../pages/LogIn/login.page'
import ProductsPage from '../pages/Produts/products.page'
import ProductDetailPage from '../pages/Produts/product-detail.page'
import CartPage from '../pages/Cart/cart.page'
import BasePage from '../pages/Base/base.page'
import CheckoutPage from '../pages/Checkout/checkout.page'
import ShippingAddressPage from '../pages/Checkout/shipping-address.page'
import PaymentMethodPage from '../pages/Checkout/payment-method.page'
import MenuPage from '../pages/Base/menu.page'
import { ShippingAddressBuilder } from '../models/shipping-address.model'
import { PaymentMethodBuilder } from '../models/payment-method.model'
import { secrets } from '../config/dev.secrets'

describe('Shopping Cart', () => {
    let requiresCartCleanup = false;

    beforeEach(async () => {
        requiresCartCleanup = false;
        await MenuPage.openCatalog();
        await expect(ProductsPage.title).toBeExisting();
        await expect(ProductsPage.title).toHaveText(
            expect.stringContaining('Products'));
    });

    afterEach(async () => {
        if (requiresCartCleanup) {
            try {
                await CartPage.clearCart();
            } catch (error) {
                console.log('Cart cleanup failed:', error);
            }
        }
    });

    it('should add product to cart and complete checkout with shipping and payment', async () => {
        await LoginPage.menu.selectLoginMenuItem();
        await LoginPage.login(secrets.username, secrets.password);
        await expect(ProductsPage.title).toBeExisting();
        const shippingAddress = ShippingAddressBuilder.generateRandomAddress();
        const paymentMethod = PaymentMethodBuilder.generateRandomPaymentMethod(shippingAddress.fullName);
        await ProductsPage.firstProduct.click();
        await ProductDetailPage.clickAddToCart();
        await BasePage.openCart();
        await CartPage.confirmCheckoutButton.click();
        await CheckoutPage.validateCheckoutTitleVisible();
        await ShippingAddressPage.fillAndSaveAddress(shippingAddress);
        await PaymentMethodPage.fillAndSavePayment(paymentMethod);
        await CheckoutPage.validateCheckoutData(shippingAddress, paymentMethod);
        await CheckoutPage.placeOrder();
        await CheckoutPage.validateOrderConfirmation();
        await CheckoutPage.continueShopping();
        await expect(ProductsPage.title).toBeExisting();
        await expect(ProductsPage.title).toHaveText(
            expect.stringContaining('Products'));
        await LoginPage.menu.logout();
    });

    it('should add product to cart and verify cart count increases', async () => {
        requiresCartCleanup = true;
        await ProductsPage.firstProduct.click();
        await ProductDetailPage.clickAddToCart();
        await BasePage.openCart();
        await BasePage.assertCartCount('1');
        await CartPage.validateItemsCountMatchesBasePage();
    });

    it('should display empty cart and return to products on continue shopping', async () => {
        requiresCartCleanup = false;
        await BasePage.openCart();
        await CartPage.validateEmptyCartMessageVisible();
        await CartPage.clickContinueShopping();
        await expect(ProductsPage.title).toBeExisting();
        await expect(ProductsPage.title).toHaveText(
            expect.stringContaining('Products'));
    });

    it('should decrease item quantity to 0 and display no items message', async () => {
        requiresCartCleanup = false;
        await ProductsPage.firstProduct.click();
        await ProductDetailPage.clickAddToCart();
        await BasePage.openCart();
        await CartPage.decreaseQuantityButton.click();
        await expect(CartPage.noItemTitle).toBeExisting();
        await CartPage.validateEmptyCartMessageVisible();
    });
});
