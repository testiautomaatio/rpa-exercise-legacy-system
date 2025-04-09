# Legacy system for RPA exercise

This repository contains a legacy system for an RPA exercise. The system is built using React and is designed to simulate a Windows 95-like environment. The published version of the system is available at https://rpa-exercise-legacy-system.pages.dev/.

This system contains a mock authentication and a mock car database. The authentication is done using a simple form, and the car database is a static list of cars. In the exercise, you are supposed to use web scraping and RPA techniques to extract the data from the HTML pages and insert it on another website.

The exercise can be completed using a variety of RPA tools, such as UiPath, Power Automate or Robot Framework, but web testing tools such as Playwright or Selenium could also be used.

## Tools and licenses

Built using [React](https://github.com/facebook/react), [React Router](https://github.com/remix-run/react-router) and [React95](https://github.com/react95-io/React95). Each of them are licensed with MIT license.

## Getting Started

The project uses Vite as a build tool. To get started, you need to have Node.js and npm installed on your machine.

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```
