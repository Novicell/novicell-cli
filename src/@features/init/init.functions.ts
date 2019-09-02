import inquirer from "inquirer";
import path from "path";
import * as fs from "fs";

// @ts-ignore
import nginxConfig from './resources/nginx.conf';

// @ts-ignore
import dockerFile from './resources/Dockerfile';

export const initQuestions: () => Promise<any> = async () => {
    let fullAnswers = {};

    const nginxAnswers = await inquirer.prompt({
        name: "NGINX_CONF_EXISTS",
        type: "confirm",
        message: "Do you already have a Nginx config file?",
        default: false,
    }).then(async (res: any)  => {
        let answers = {...res};

        if (res.NGINX_CONF_EXISTS) {
            const answer = await inquirer.prompt({
                type: "input",
                name: "NGINX_CONF_PATH",
                message: "Where is the Nginx config located? (Directory)",
            });

            answers = {...answers, ...answer};
        } else {
            let answer = await inquirer.prompt({
                type: "confirm",
                name: "NGINX_CONF_GENERATE",
                message: "Should we generate a config file for you?",
                default: true
            });

            answers = {...answers, ...answer};

            if(answer.NGINX_CONF_GENERATE) {
                let pathPrompt = await inquirer.prompt({
                    type: "input",
                    name: "NGINX_CONF_PATH",
                    message: "Where do you want us to put your Nginx config file?",
                    default: './config'
                });

                answers = {...answers, ...pathPrompt};
            }
        }

        return answers;
    });

    fullAnswers = {...fullAnswers, ...nginxAnswers};

    const dockerAnswers = await inquirer.prompt({
        name: "DOCKER_CONF_EXISTS",
        type: "confirm",
        message: "Do you already have a Dockerfile?",
        default: false,
    }).then(async (res: any)  => {
        let answers = {...res};

        if (res.NGINX_CONF_EXISTS) {
            const answer = await inquirer.prompt({
                type: "input",
                name: "DOCKER_CONF_PATH",
                message: "Where is the Dockerfile located? (Directory)",
            });

            answers = {...answers, ...answer};
        } else {
            let answer = await inquirer.prompt({
                type: "confirm",
                name: "DOCKER_CONF_GENERATE",
                message: "Should we generate a Dockerfile for you?",
                default: true
            });

            answers = {...answers, ...answer};

            if(answer.DOCKER_CONF_GENERATE) {
                let pathPrompt = await inquirer.prompt({
                    type: "input",
                    name: "DOCKER_CONF_PATH",
                    message: "Where do you want us to put your Dockerfile?",
                    default: './'
                });

                answers = {...answers, ...pathPrompt};
            }
        }

        return answers;
    });

    fullAnswers = {...fullAnswers, ...dockerAnswers};



    return fullAnswers;
};

export const createNginxConfig = async (rawPath: string = './config') => {
    const configPath = path.resolve(process.cwd(), rawPath);

    fs.mkdirSync(configPath, {recursive: true});

    fs.writeFileSync(path.resolve(process.cwd(), rawPath, 'nginx.conf'), nginxConfig);

    return configPath;
};

export const createDockerfile = async (rawPath: string = './') => {
    const configPath = path.resolve(process.cwd(), rawPath);

    fs.mkdirSync(configPath, {recursive: true});

    fs.writeFileSync(path.resolve(process.cwd(), rawPath, 'Dockerfile'), dockerFile);

    return configPath;
};
