import inquirer from 'inquirer';
import path from 'path';
import * as fs from 'fs';
import axios from 'axios';

export const initQuestions: () => Promise<any> = async () => {
  let fullAnswers = {};

  const routeAnswer = await inquirer
    .prompt({
      name: 'WHICH_ROUTE',
      type: 'list',
      message: 'Choose preferred setup option',
      choices: ['Default setup', 'Manual setup'],
    })
    .then(async (res: any) => {
      let answers = { ...res };
      return answers;
    });

  fullAnswers = { ...fullAnswers, ...routeAnswer };

  return fullAnswers;
};

export const goWithDefault = async () => {
  const { data } = await axios.get(
    'https://api.github.com/repos/Novicell/frontend-packages/contents/packages/vue/spa-cms-frontend',
  );
  const { download_url } = data[0];
  const file = await axios({
    method: 'get',
    url: download_url,
    responseType: 'stream',
  });

  file.data.pipe(fs.createWriteStream(process.cwd + '/temp'));

  // console.log(download_url);

  console.log('go With Default');
};

export const goWithManual = () => {
  console.log('go With Manual');
};
