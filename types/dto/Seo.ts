
export interface Seo extends Partial<{
    urlMask: string;
    title: string;
    description: string;
    keywords: string[];
    entityId: number;
    id?: number;
}> { }