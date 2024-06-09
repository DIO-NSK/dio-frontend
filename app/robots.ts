import {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/profile/', '/admin/'],
        },
        sitemap: 'https://diowater.ru/sitemap.xml',
    }
}