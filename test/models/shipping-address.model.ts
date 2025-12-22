export interface ShippingAddress {
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export class ShippingAddressBuilder {
    public static generateRandomAddress(): ShippingAddress {
        return {
            fullName: 'John Doe',
            address1: '123 Main Street',
            address2: 'Apt 5',
            city: 'Boston',
            state: 'MA',
            zip: '02101',
            country: 'USA'
        };
    }
}
