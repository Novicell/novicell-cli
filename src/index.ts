import chalk from "chalk";
import program from "commander";
import {createDockerfile, createNginxConfig, deployQuestions} from "./@commands/add/deploy_tools/deploy.functions";

program.version('0.0.1');

program.command('add [feature_name]')
    .description('Adds a feature to an existing project')
    .action(async (feature_name) => {
        console.log(feature_name);
        console.log('Create default Nuxt hosting setup:');
        
        const answers = await deployQuestions();

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

    // Generates default files for a Nuxt SSR setup
program.parse(process.argv);
