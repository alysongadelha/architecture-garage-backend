const getAssetValue = (assets, key) => {
  const assetValue = assets.find((asset) => asset.alt === key);
  return assetValue.iconValue;
};

module.exports = { getAssetValue };
