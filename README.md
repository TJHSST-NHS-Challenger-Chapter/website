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

The Service page links to a guide on how members should the internal google classroom to keep track of their service hours. It also has a table of service opportunities submitted to the site.

## FAQ

The FAQ page contains answers to common questions from applicants and others.

## Contact Us

The Contact Us page has a form that allows anyone to send us a question or feedback.

# Development

The website uses flask as a backend and requires webpack for frontend development. After cloning the repository, run `npm install` from the `frontend/` directory. Run `npm run watch` to rebuild the css and js on changes. In the root directory of the repository, run `python app.py` to start the backend in debug mode. The page will need to be refreshed after changes.

## Commands

### `python app.py`

Launches the flask server for development. Required in order to view changes.

### `npm run watch` (in `frontend/`)

Begins to watch `*.scss` and `*.js` files on the frontend for changes and rebuilds when it sees them. This is necessary only for development, though is not required if only changing HTML.

### `npm run build` (in `frontend/`)

Builds all of the frontend code to production quality. Avoids developer tools like source-maps and doesn't watch for changes.

### `npm run format` (in `frontend/`)

Runs [Prettier](https://prettier.io/) to maintain code style across documents. Please run this before you commit if you made changes to `*.scss` or `*.js` files!

## Outline

Below is an outline of the directory structure of the project.

The `scss/` folder is organized following [The 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern), and all of the styles are bundled together into `styles.css` every build. Webpack is used to compile the scss so that the site can extend [Material Components Web](https://github.com/material-components/material-components-web).

The `templates/` folder holds templates for the flask app.

> **Note:** referencing static files needs to be done specially; see `home.html` for an example.

```
├── LICENSE
├── README.md
├── __pycache__ [...]
├── app.py
├── frontend
│   ├── node_modules [...]
│   ├── build
│   │   ├── about.js
│   │   ├── contact.js
│   │   ├── faq.js
│   │   ├── home.js
│   │   ├── service.js
│   │   └── styles.css
│   ├── src
│   │   ├── js
│   │   │   ├── [...]
│   │   │   └── pages
│   │   │       ├── about.js
│   │   │       ├── contact.js
│   │   │       ├── faq.js
│   │   │       ├── home.js
│   │   │       └── service.js
│   │   ├── scss
│   │   │   ├── abstracts
│   │   │   │   └── _variables.scss
│   │   │   ├── base
│   │   │   │   ├── _reset.scss
│   │   │   │   └── _typography.scss
│   │   │   ├── components
│   │   │   │   ├── _button.scss
│   │   │   │   └── _notification.scss
│   │   │   ├── layout
│   │   │   │   ├── _footer.scss
│   │   │   │   ├── _header.scss
│   │   │   │   └── _navigation.scss
│   │   │   ├── pages
│   │   │   │   ├── _about.scss
│   │   │   │   ├── _contact.scss
│   │   │   │   ├── _faq.scss
│   │   │   │   ├── _home.scss
│   │   │   │   └── _service.scss
│   │   │   └── main.scss
│   │   └── templates
│   │       ├── about.html
│   │       ├── contact.html
│   │       ├── faq.html
│   │       ├── home.html
│   │       └── service.html
│   ├── package-lock.json
│   ├── package.json
│   ├── webpack.config.js
├── requirements.txt
└── venv [...]
```
