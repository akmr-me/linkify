import publicConfig from "@/lib/publicConfig";
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${publicConfig.host}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${publicConfig.host}/login`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${publicConfig.host}/register`,
            lastModified:new Date(),
            changeFrequency:'weekly',
            priority:0.8
        },
        {
            url: `${publicConfig.host}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7
        },
        {
            url: `${publicConfig.host}/features`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7
        },
        {
            url: `${publicConfig.host}/pricing`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7
        }
    ]
}