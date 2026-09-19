const IMAGE_ROUTE_PREFIX = '/api/assets/images';

export function getPublicAssetImageUrl(storagePath: string) {
  const encodedPath = storagePath.split('/').filter(Boolean).map((segment) => encodeURIComponent(segment)).join('/');
  return `${IMAGE_ROUTE_PREFIX}/${encodedPath}`;
}