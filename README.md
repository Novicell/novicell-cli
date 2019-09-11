# Novicell Nuxt SPA hosting setup
As of frontend focusing on being headless and focusing on Single Page Applications, we need to take care of SEO and provide content for search engines. This can be done doing server side rendering of the javascript components, that we use in Vue.js.

To do this we utilize several components in order to build a solid infrastructure that both gives the developer the freedom they need, and also the performance and scalability that is expected from a 2019 web application.

To create this we use the following technologies:

* Docker
* NGINX
* Node.js
* Express
* PM2

## Docker
Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package. By doing so, thanks to the container, the developer can rest assured that the application will run on any other Linux machine regardless of any customized settings that machine might have that could differ from the machine used for writing and testing the code.

In a way, Docker is a bit like a virtual machine. But unlike a virtual machine, rather than creating a whole virtual operating system, Docker allows applications to use the same Linux kernel as the system that they're running on and only requires applications be shipped with things not already running on the host computer. This gives a significant performance boost and reduces the size of the application.

We use Docker to wrap our webserver (NGINX) and our NodeJS runtime, so that it can be deployed and scaled as a stateless application. Additionally developers have the safety of knowing that if it works on their machine, it will work in production.

## NGINX
NGINX is open source software for web serving, reverse proxying, caching, load balancing, media streaming, and more. It started out as a web server designed for maximum performance and stability.

NGINX consistently beats [Apache and other servers in benchmarks](https://www.rootusers.com/linux-web-server-performance-benchmark-2016-results/) measuring web server performance.

We utilize NGINX by letting it do what it is best at, serving static assets, and passing dynamic requests to our NodeJS application by creating a reverse proxy. 

We have all our static assets such as the CSS, JavaScript and Images served directly through NGINX and the filesystem, while all requests for pages gets forwarded onto our Nuxt SSR application which renders our Vue.js application and returns a HTML page that we then serve.

### Micro-caching (Optional)
Additionally we can enable micro-caching to severely increase the performance of the application. Micro-caching temporarily caches certain content for a very short period of time (Default: 1 second). During this time, all other requests for the same content get their content from the cache instead of the Nuxt SSR Application.

It ensures that, when the web page or site is under heavy load, most of the visitors get a copy of the page served from the static content cache rather than the origin server. The process reduces the load on the server and improves the overall performance of the website.

## Node.js
Node.js is an open-source, cross-platform, JavaScript run-time environment that executes JavaScript code outside of a browser. 

Node.js gives us the opportunity to render our Vue.js application on the server and return the HTML to the user, so that there is a zero SEO loss from building a website as a Single-Page-Application.

## Express
Express is a fast, unopinionated, minimalist web framework for Node.js.

Express allows us to pick up and modify requests before passing it onto our Nuxt application, this gives us the opportunity to set or remove headers, give better context to our application as well as caching data that rarely change (When scaling to multiple instances, the caching should be moved to a shared Redis), speeding up the rendering of our application.

## PM2
PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

We utilize it to make sure that if, for what ever reason, our application crashes, it will automatically reload the application so that it is ready to handle the next request. Additionally we also utilize [PM2's dashboard](https://pm2.io/) to get more insight into how our application are performing as well as their stability.
