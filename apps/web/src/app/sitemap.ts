import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { const base='https://assetveyra.com'; return [
 {url:base,changeFrequency:'weekly',priority:1},{url:`${base}/opportunities`,changeFrequency:'daily',priority:0.9},{url:`${base}/contact`,changeFrequency:'monthly',priority:0.5},{url:`${base}/legal`,changeFrequency:'monthly',priority:0.4},{url:`${base}/privacy`,changeFrequency:'monthly',priority:0.3},{url:`${base}/terms`,changeFrequency:'monthly',priority:0.3},{url:`${base}/security`,changeFrequency:'monthly',priority:0.4},{url:`${base}/login`,changeFrequency:'monthly',priority:0.3},{url:`${base}/signup`,changeFrequency:'monthly',priority:0.3}
]; }
