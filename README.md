# Purpose

This website is designed to help current and future TJHSST National Honor Society (NHS) Challenger Chapter members learn more about NHS, discover service opportunities, and keep track of important deadlines.

# About

The Thomas Jefferson National Honor Society is a part of the Challenger Chapter of NHS. This club is open to 11th and 12th graders who meet GPA and service hour requirements and demonstrate excellence in the areas of our four pillars: scholarship, leadership, service, and character. Students eligible will be notified at the beginning of their 11th grade year.

National Honor Society requires its members to perform service activities both inside and outside of school over the course of the year.

# Outline

## Home

The Home page has deadlines, announcements, and important dates, collated from both the [facebook page](https://www.facebook.com/tjhsstnhs/) and our internal google classroom. Deadlines and important events can be downloaded and added to calendar apps.

## About

The About page contains information about our officers and general information about the TJHSST NHS Challenger Chapter and the NHS organization as a whole.

## Service

Ther Service page lets members submit service opportunities through a Google Form and view a list of the opportunities submitted by others. This will hopefully help members find new opportunities to volunteer.

## FAQ

The FAQ page contains answers to common questions from applicants and others about both the application process and general NHS rules and conduct.

## Contact Us

The Contact Us page has a form that allows anyone to send us a question or feedback.

# Development

The website uses flask as a backend and requires webpack for frontend development. After cloning the repository, run `npm install` from the `frontend/` directory. Run `npm run watch` (from that directory) to rebuild the css and js on changes. In the root directory of the repository, enter the virtual environment with `source ./venv/bin/activate`, install dependencies with `pip install -r requirements.txt`, and run `python app.py` to start the backend in debug mode. The page will need to be refreshed after changes.

> Note: All of the pages have a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers) used to cache requests so that the website will work offline as a Progressive Web App (PWA). If recent changes aren't taking effect, try any combination of the following:
>
> -   Comment out the imports to `import "../register"` in all of the js files in `src/js/pages`. This will disable the service worker.
> -   Forcefully clear the browser cache. In Chrome, this is done with the key combination <kbd>Shift + Ctrl + R</kbd>.
> -   Forcefully clear the application cache. Open the devtools inspector (<kbd>F12</kbd> in Chrome), go to `Application > Application > Storage`, and click the `Clear site data` button.
> -   Reload the service worker. Navigate to `Application > Application > Service Workers` in devtools, click `Unregister`, and reload the page.

## Commands

### `python app.py`

Launches the flask server for production. Run `export FLASK_ENV=development` to run in development. Additionally, the google sheets API will error if you don't have a file `credentials.json` in the same directory as `app.py`. If you need this file, download it from the "NHS Website" google drive folder, and if you have it, DO NOT COMMIT IT!

### `npm run watch` (in `frontend/`)

Begins to watch `*.scss` and `*.js` files on the frontend for changes and rebuilds when it sees them. This is necessary only for development, though is not required if only changing HTML.

### `npm run build` (in `frontend/`)

Builds all of the frontend code to production quality. Avoids developer tools like source-maps and doesn't watch for changes.

### `npm run format` (in `frontend/`)

Runs [Prettier](https://prettier.io/) to maintain code style across documents. Please run this before you commit if you made changes to `*.scss` or `*.js` files!

## Deployment

The site is hosted on Director ([here](https://director.tjhsst.edu/sites/244/), though you'll need access), which means that there isn't any automation in the deployment process. All of the following steps should be done manually to update the site:

1. Open a console in Director and, from the `public/` directory, run `git pull`
1. Navigate to the `public/frontend/` directory and run `npm run build` (typically takes 80-90 seconds)
1. Click "nhs" near the top left and press the `Restart process` button. The process status will shift to saying "Shutting down" to "Starting". Once it starts with "Running since", the newest changes should be in effect.

## Outline

Below is an outline of the directory structure of the project.

The `scss/` folder is organized following [The 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern), and all of the styles are bundled together into `styles.css` every build. Webpack is used to compile the scss so that the site can extend [Material Components Web](https://github.com/material-components/material-components-web).

The `templates/` folder holds templates for the flask app.

> **Note:** referencing static files needs to be done specially; see `home.html` for an example.

```
.
├── .gitignore
├── LICENSE
├── README.md (this file)
├── __pycache__ [...]
├── app.py
├── credentials.json
├── frontend
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── build
│   │   ├── assets
│   │   │   ├── AJ Seo.jpg
│   │   │   ├── Alice Ji.jpg
│   │   │   ├── Emma Cheng.jpg
│   │   │   ├── Forrest Meng.jpg
│   │   │   ├── Jason Klein.jpg
│   │   │   ├── Jason Wang.jpg
│   │   │   ├── Liam Reaser.jpg
│   │   │   ├── Michelle Ru.jpg
│   │   │   ├── Minjoo Song.jpg
│   │   │   ├── Sadhika Dhanasekar.jpg
│   │   │   ├── icon-192x192.png
│   │   │   ├── icon-256x256.png
│   │   │   ├── icon-384x384.png
│   │   │   ├── icon-512x512.png
│   │   │   ├── icon-square-192x192.png
│   │   │   └── maskable_icon.png
│   │   ├── js
│   │   │   ├── about.js
│   │   │   ├── contact.js
│   │   │   ├── faq.js
│   │   │   ├── home.js
│   │   │   └── service.js
│   │   ├── public
│   │   │   ├── favicon.ico
│   │   │   ├── manifest.json
│   │   │   └── sw.js
│   │   └── styles
│   │       └── styles.css
│   ├── node_modules [...]
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── assets
│   │   │   ├── AJ Seo.jpg
│   │   │   ├── Alice Ji.jpg
│   │   │   ├── Emma Cheng.jpg
│   │   │   ├── Forrest Meng.jpg
│   │   │   ├── Jason Klein.jpg
│   │   │   ├── Jason Wang.jpg
│   │   │   ├── Liam Reaser.jpg
│   │   │   ├── Michelle Ru.jpg
│   │   │   ├── Minjoo Song.jpg
│   │   │   ├── Sadhika Dhanasekar.jpg
│   │   │   ├── icon-192x192.png
│   │   │   ├── icon-256x256.png
│   │   │   ├── icon-384x384.png
│   │   │   ├── icon-512x512.png
│   │   │   ├── icon-square-192x192.png
│   │   │   └── maskable_icon.png
│   │   ├── js
│   │   │   ├── button.js
│   │   │   ├── navigation.js
│   │   │   ├── pages
│   │   │   │   ├── about.js
│   │   │   │   ├── contact.js
│   │   │   │   ├── faq.js
│   │   │   │   ├── home.js
│   │   │   │   └── service.js
│   │   │   └── register.js
│   │   ├── public
│   │   │   ├── favicon.ico
│   │   │   ├── manifest.json
│   │   │   └── sw.js
│   │   ├── scss
│   │   │   ├── abstracts
│   │   │   │   └── _variables.scss
│   │   │   ├── base
│   │   │   │   ├── _reset.scss
│   │   │   │   └── _typography.scss
│   │   │   ├── components
│   │   │   │   ├── _button.scss
│   │   │   │   └── _notification.scss
│   │   │   ├── layout
│   │   │   │   ├── _footer.scss
│   │   │   │   ├── _header.scss
│   │   │   │   ├── _layout.scss
│   │   │   │   └── _navigation.scss
│   │   │   ├── main.scss
│   │   │   ├── pages
│   │   │   │   ├── _about.scss
│   │   │   │   ├── _contact.scss
│   │   │   │   ├── _faq.scss
│   │   │   │   ├── _home.scss
│   │   │   │   └── _service.scss
│   │   │   └── vendors
│   │   │       └── _material.scss
│   │   └── templates
│   │       ├── about.html
│   │       ├── contact.html
│   │       ├── faq.html
│   │       ├── home.html
│   │       └── service.html
│   └── webpack.config.js
├── requirements.txt
└── venv [...]

```
