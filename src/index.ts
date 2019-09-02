import chalk from "chalk";
import program from "commander";
import {createDockerfile, createNginxConfig, initQuestions} from "./@features/init/init.functions";

program.version('0.0.1');

program.command('init')
    .alias('i')
    .description('Generates default files for a Nuxt SSR setup')
    .action(async () => {
        console.log('Create default Nuxt hosting setup:');

        const answers = await initQuestions();

        if(answers.NGINX_CONF_GENERATE) {
            // Should create nginx config file
            const filePath = await createNginxConfig(answers.NGINX_CONF_PATH);
            console.log(chalk.green`Created Nginx config file in ${filePath}`);
        }

        if(answers.DOCKER_CONF_GENERATE) {
            // Should create nginx config file
            const filePath = await createDockerfile(answers.DOCKER_CONF_PATH);
            console.log(chalk.green`Created Dockerfile ${filePath}`);
        }
    });

program.parse(process.argv);
