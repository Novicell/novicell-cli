import {Feature, FeatureList} from "@models/feature.interface";

export const didYouMean = (feature_name: string, all_features: FeatureList) => {
    if (feature_name.length) {
        console.log('feature was written');
    }
}