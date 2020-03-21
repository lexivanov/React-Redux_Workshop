import { urlBuilder } from '../Utils';

import { HttpService } from './Http.service';

const apiPrefix = `https://api-crud-mongo.herokuapp.com/api/v1`;

const productUrls = {
    add:     `${apiPrefix}/products/add`,
    edit:    `${apiPrefix}/products/update/{productId}`,
    get:     `${apiPrefix}/products`,
    getById: `${apiPrefix}/products/{productId}`,
    delete:  `${apiPrefix}/products/delete/{productId}`
};

export class ProductsDataService {
    static async get(productId) {
        const result = productId != null
            ? await HttpService.get(urlBuilder(productUrls.getById, { productId }))
            : await HttpService.get(productUrls.get);

        return result.Data;
    }

    static async addOrEdit (product) {
        const result = !product.id
            ? await HttpService.post(productUrls.add, product)
            : await HttpService.put(urlBuilder(productUrls.edit, { productId: product.id }), product);
        
        return result.Data;
    }

    static async delete(productId) {
        const result = await HttpService.delete(urlBuilder(productUrls.delete, { productId }));
        
        return result.Data;
    }

    static deliverySetup = {
        countries: ['USA', 'Russia', 'Japan'],
        cities: {
            'USA':    ['Washington', 'Detroit', 'New York'],
            'Russia': ['Moskow', 'St. Petersburg', 'Saratov'],
            'Japan':  ['Tokyo', 'Yokohama', 'Osaka']
        }
    }
}