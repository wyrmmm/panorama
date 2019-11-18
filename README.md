## Panorama

This is a web application side project that I developed to practice using React hooks, Redux, Storybook, and React Testing Library. It also provided an opportunity for me to start learning Node.js.

You can click on the country, and the web application will show you the latest tweets, news, and Google trends for that country. And the map will also move to that country! Isn't that great?

The web application is deployed on an Amazon EC2 instance, and it even has SSL!

#### Further Work

Node server:
Every time the client requests for Google trends for a country, my Node server will spawn a new Puppeteer browser to scrape the Google Trends website to get the results. If I were smarter about it, I should probably cache the results so that it's more scalable.

Dev Ops:
Every time I want to deploy changes in master, I need to build, commit and push that build, SSH into my server and pull the latest build files. That's obviously repetitive and prone to errors, so setting up a CI/CD pipeline would be a great extension to this project.
