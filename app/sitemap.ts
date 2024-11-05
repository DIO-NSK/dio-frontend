import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://dioshop.ru',
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: 'https://dioshop.ru/product/sitemap.xml',
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: 'https://dioshop.ru/bonus-program',
            lastModified: new Date(),
            priority: 0.9,
        },
        {
            url: 'https://dioshop.ru/about-company',
            lastModified: new Date(),
            priority: 0.9,
        },
        {
            url: 'https://dioshop.ru/catalog/sitemap.xml',
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: 'https://dioshop.ru/sales/sitemap.xml',
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: 'https://dioshop.ru/services',
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: 'https://dioshop.ru/catalog/categories/sitemap.xml',
            lastModified: new Date(),
        },
        {
            url: 'https://dioshop.ru/cart',
            lastModified: new Date(),
        },
        {
            url: 'https://dioshop.ru/favorites',
            lastModified: new Date(),
        },
        {
            url: 'https://dioshop.ru/contacts',
            lastModified: new Date(),
        },
        {
            url: 'https://dioshop.ru/installment-plan',
            lastModified: new Date(),
        },
        {
            url: 'https://dioshop.ru/payment',
            lastModified: new Date(),
        },
        {
            url: 'https://dioshop.ru/policy',
            lastModified: new Date(),
        },
        {
            url: 'https://dioshop.ru/returning',
            lastModified: new Date(),
        },
        {
            url: 'https://dioshop.ru/service-center',
            lastModified: new Date(),
        },
    ]
}