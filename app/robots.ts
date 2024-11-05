import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/healthycheck',
                '/profile/',
                '/admin/',
                '/cart/',
                '/favorites/',
                '/catalog/categories$',
                '/product$',
                '/catalog$'
            ],
        },
        sitemap: [
            'https://dioshop.ru/sitemap.xml',
            'https://dioshop.ru/catalog/categories/sitemap.xml',
            'https://dioshop.ru/product/sitemap.xml',
            'https://dioshop.ru/catalog/sitemap.xml',
            'https://dioshop.ru/sales/sitemap.xml',
        ]
    }
}