import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://diowater.ru',
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: 'https://diowater.ru/product/sitemap.xml',
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: 'https://diowater.ru/bonus-program',
            lastModified: new Date(),
            priority: 0.9,
        },
        {
            url: 'https://diowater.ru/about-company',
            lastModified: new Date(),
            priority: 0.9,
        },
        {
            url: 'https://diowater.ru/catalog/sitemap.xml',
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: 'https://diowater.ru/sales/sitemap.xml',
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: 'https://diowater.ru/services',
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: 'https://diowater.ru/catalog/categories/sitemap.xml',
            lastModified: new Date(),
        },
        {
            url: 'https://diowater.ru/cart',
            lastModified: new Date(),
        },
        {
            url: 'https://diowater.ru/favorites',
            lastModified: new Date(),
        },
        {
            url: 'https://diowater.ru/contacts',
            lastModified: new Date(),
        },
        {
            url: 'https://diowater.ru/installment-plan',
            lastModified: new Date(),
        },
        {
            url: 'https://diowater.ru/payment',
            lastModified: new Date(),
        },
        {
            url: 'https://diowater.ru/policy',
            lastModified: new Date(),
        },
        {
            url: 'https://diowater.ru/returning',
            lastModified: new Date(),
        },
        {
            url: 'https://diowater.ru/service-center',
            lastModified: new Date(),
        },
    ]
}