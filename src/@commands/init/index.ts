import { FeatureList } from '@models/feature.interface';
import { didYouMean } from '@utils/index';
import { goWithDefault, goWithManual, setUpNuxtForTesting } from './functionality/init.functions';
import { initQuestions } from './functionality/init.questions';

export const init = async (opts: any) => {
  if (opts.test) {
    // if -t, --test flag is provided
    setUpNuxtForTesting();
  } else if (opts.default) {
    // id -d, --default flag is provided
    goWithDefault();
    // id -m, --manual flag is provided
  } else if (opts.manual) {
    goWithManual();
  } else {
    // If NO flags are provided
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
