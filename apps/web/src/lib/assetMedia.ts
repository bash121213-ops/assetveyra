import type { SupabaseClient } from '@supabase/supabase-js';

export type PublicAssetImage={id:string;asset_id:string;storage_path:string;sort_order:number;signed_url:string};

export async function getPublishedAssetImages(s: SupabaseClient, assetIds:string[]):Promise<Map<string,PublicAssetImage[]>>{
  const result=new Map<string,PublicAssetImage[]>(); if(!assetIds.length)return result;
  const {data:images,error}=await s.from('asset_images').select('id,asset_id,storage_path,sort_order').in('asset_id',assetIds).order('sort_order',{ascending:true});
  if(error||!images?.length)return result;
  const paths=images.map(i=>i.storage_path);
  const {data:signed,error:signedError}=await s.storage.from('property-images').createSignedUrls(paths,60*60);
  if(signedError||!signed)return result;
  const byPath=new Map(signed.map(item=>[item.path,item.signedUrl]));
  for(const image of images){const url=byPath.get(image.storage_path);if(!url)continue;const item={...image,signed_url:url};const list=result.get(image.asset_id)??[];list.push(item);result.set(image.asset_id,list)}
  return result;
}

export async function getPublishedAssetImage(s:SupabaseClient,assetId:string){const map=await getPublishedAssetImages(s,[assetId]);return map.get(assetId)?.[0]??null;}
