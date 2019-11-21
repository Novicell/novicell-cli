import chalk from 'chalk';
import { FeatureList } from '@models/feature.interface';
import { didYouMean } from '@utils/index';
import {
  initQuestions,
  goWithDefault,
  goWithManual,
} from './functionality/init.functions';

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