// node imports
import path from 'path';
import * as fs from 'fs';
// 3rd pt. imports
import stringSimilarity from 'string-similarity';
import chalk from 'chalk';
// slf imports
import { FeatureList } from '@models/feature.interface';

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
    console.log('You can use --help flag');
    console.log(`Can't find.. Did you mean: ${chalk.blueBright(arr_to_search_from[matches.bestMatchIndex].value)} ?`);
  } else {
  }
};

export const showcase_opts = (features: FeatureList) => {
  console.log('\n Features: ');
  for (const key in features) {
    console.log(`${chalk.blueBright(features[key].value)} - ${features[key].description}`);
  }
};

export const create_file = async (rawPath: string = './', fileName: string, fileContents: any, opts = {}): Promise<string> => {
  const configPath = path.resolve(process.cwd(), rawPath);

  if (!fs.existsSync(configPath) && fs.mkdirSync(configPath)) {
    fs.mkdirSync(configPath, { recursive: true });
  }

  try {
    fs.writeFileSync(path.resolve(process.cwd(), rawPath, fileName), fileContents, opts);
    console.log('Created ' + chalk.green(fileName.toString()) + ` in ${configPath}`);
  } catch (error) {
    console.log('There was a problem creating ' + chalk.red(fileName.toString()));
    console.log(error);
  }

  return configPath;
};
