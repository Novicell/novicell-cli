import {Feature, FeatureList} from "@models/feature.interface";
import stringSimilarity from 'string-similarity';

export const didYouMean = (feature_name: string, all_features: FeatureList) => {
    const matches = stringSimilarity.findBestMatch('healed', ['edward', 'sealed', 'theatre']);
    console.log(matches);
    

    if (feature_name.length) {
        console.log('feature was written');
    }
}