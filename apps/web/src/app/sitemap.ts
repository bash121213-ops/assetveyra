import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base='https://assetveyra.com';
  return [
    {url:base,changeFrequency:'weekly',priority:1},
    {url:`${base}/about`,changeFrequency:'monthly',priority:0.7},
    {url:`${base}/why-trust-us`,changeFrequency:'monthly',priority:0.7},
    {url:`${base}/legal-partners`,changeFrequency:'monthly',priority:0.5},
    {url:`${base}/how-it-works`,changeFrequency:'monthly',priority:0.8},
    {url:`${base}/fees`,changeFrequency:'monthly',priority:0.7},
    {url:`${base}/failed-deal`,changeFrequency:'monthly',priority:0.5},
    {url:`${base}/opportunities`,changeFrequency:'daily',priority:0.9},
    {url:`${base}/verification`,changeFrequency:'monthly',priority:0.7},
    {url:`${base}/policies`,changeFrequency:'monthly',priority:0.5},
    {url:`${base}/faq`,changeFrequency:'monthly',priority:0.5},
    {url:`${base}/contact`,changeFrequency:'monthly',priority:0.5},
    {url:`${base}/privacy`,changeFrequency:'monthly',priority:0.3},
    {url:`${base}/terms`,changeFrequency:'monthly',priority:0.3},
    {url:`${base}/security`,changeFrequency:'monthly',priority:0.4},
    {url:`${base}/login`,changeFrequency:'monthly',priority:0.3},
    {url:`${base}/signup`,changeFrequency:'monthly',priority:0.3},
  ];
}