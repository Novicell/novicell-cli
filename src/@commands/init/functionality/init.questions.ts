import inquirer from 'inquirer';

export const initQuestions: () => Promise<any> = () =>
  inquirer.prompt({
    name: 'WHICH_ROUTE',
    type: 'list',
    message: 'Choose preferred setup option',
    choices: ['Default setup', 'Manual setup'],
  });

/** @param {boolean} ask_extra if TRUE asks for manual questions. If FALSE, only asks for required questions */
export const choosePath = async (): Promise<any> =>
  inquirer.prompt({
    type: 'input',
    name: 'INIT_PATH',
    message: 'Destination path: ',
    default: './',
  });

export const askNuxtQuestions = async (ask_extra: boolean): Promise<any> => {
  const mandatory_questions = [
    {
      type: 'input',
      name: 'NAME',
      message: 'Project name: ',
    },
    {
      type: 'input',
      name: 'DESCRIPTION',
      message: 'Project description: ',
    },
    {
      type: 'input',
      name: 'AUTHOR',
      message: 'Author: ',
      default: 'Novicell',
    },
  ];

  // for manual setup
  const extra_questions = [
    {
      type: 'input',
      name: 'INIT_PATH',
      message: 'Destination path: ',
      default: './',
    },
  ];
  const final_questions = [...mandatory_questions, ...(ask_extra ? extra_questions : [])];

  return inquirer.prompt(final_questions);
};
