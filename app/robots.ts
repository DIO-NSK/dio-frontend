import {MetadataRoute} from 'next'

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
            'https://diowater.ru/sitemap.xml',
            'https://diowater.ru/catalog/categories/sitemap.xml',
            'https://diowater.ru/product/sitemap.xml',
            'https://diowater.ru/catalog/sitemap.xml',
            'https://diowater.ru/sales/sitemap.xml',
        ]
    }
}