import { expect } from '@wdio/globals'
import ProductsPage from '../pages/Produts/products.page'
import ProductDetailPage from '../pages/Produts/product-detail.page'

describe('Product Details', () => {

    it('should decrease item quantity to 0 and disable add to cart button', async () => {
        await ProductsPage.firstProduct.click();
        let itemCount = await ProductDetailPage.getItemCount();
        expect(itemCount).toBe(1);

        await ProductDetailPage.clickDecreaseQuantity();
        itemCount = await ProductDetailPage.getItemCount();
        expect(itemCount).toBe(0);

        await ProductDetailPage.validateAddToCartButtonDisabled();
    });
});
