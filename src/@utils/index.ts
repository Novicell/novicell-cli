import chalk from 'chalk';
import { Feature, FeatureList } from '@models/feature.interface';
import stringSimilarity from 'string-similarity';

export const didYouMean = (feature_name: string, all_features: FeatureList) => {
  let arr_to_search_from = [];

  for (const key in all_features) {
    const arr_val_and_desc: Array<string> = Object.values(all_features[key]);
    arr_to_search_from.push({
      value: all_features[key].value,
      search_keywords: arr_val_and_desc.join(' '),
    });
  }

  if (feature_name && feature_name.length) {
    const matches = stringSimilarity.findBestMatch(
      feature_name,
      arr_to_search_from.map(x => x.search_keywords),
    );
    console.log(
      `Can't find.. Did you mean: ${chalk.blueBright(
        arr_to_search_from[matches.bestMatchIndex].value,
      )} ?`,
    );
  } else {
  }
};

export const showcase_opts = (features: FeatureList) => {
  console.log('');
  console.log('Features: ');
  for (const key in features) {
    console.log(
      `${chalk.blueBright(features[key].value)} - ${features[key].description}`,
    );
  }
};
