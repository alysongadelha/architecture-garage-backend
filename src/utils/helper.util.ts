const getAssetValue = (assets: any[], key: string): string => {
  const assetValue = assets.find((asset) => asset.alt === key);
  return assetValue.iconValue;
};

module.exports = { getAssetValue };
