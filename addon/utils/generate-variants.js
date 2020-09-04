export default function generateVariants(styleName, variants, variantInterpolator) {
  // TODO: error/input handling?
  return Object.keys(variants).reduce((allVariants, variantName) => {
    allVariants[`${styleName}-${variantName}`] = variantInterpolator(variants[variantName]);
    return allVariants;
  }, { });
}
