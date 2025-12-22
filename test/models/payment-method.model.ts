export interface PaymentMethod {
    name: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
}

export class PaymentMethodBuilder {
    public static generateRandomPaymentMethod(nameOverride?: string): PaymentMethod {
        return {
            name: nameOverride || 'John Doe',
            cardNumber: '4111111111111111',
            expirationDate: '12/27',
            securityCode: '123'
        };
    }
}
