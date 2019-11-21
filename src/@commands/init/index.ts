import chalk from 'chalk';
import { FeatureList } from '@models/feature.interface';
import { didYouMean } from '@utils/index';
import { initQuestions } from './questionnaire/init.functions';

export const init = async (opts: any) => {
  if (opts.default) {
    goWithDefault();
  } else {
    const { WHICH_ROUTE } = await initQuestions();

    switch (WHICH_ROUTE) {
      case 'Default setup':
        goWithDefault();
        break;
      case 'Manual setup':
        goWithManual();
        break;
    }
  }
};

const goWithDefault = () => {
  console.log('goWithDefault');
};

const goWithManual = () => {
  console.log('goWithDefault');
};

// export const init_opts = () => {
//   console.log('');
//   console.log('Features: ');
//   for (const key in features) {
//     console.log(
//       `${chalk.blueBright(features[key].value)} - ${features[key].description}`,
//     );
//   }
// };
