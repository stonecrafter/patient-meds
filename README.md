# Patient-Medication Application

A simple prototype of an application to keep track of patients and their medications.

Technologies used: React with TypeScript, Redux with redux-toolkit, react-router-dom, LESS, npm, antd for design / UI components

## Features

1. Create / view / edit / delete patients
2. Patient info contains: first and last name, phone number, email, birthdate and a list of medications
3. Search for medications using a given API
4. Ability to assign and un-assign medications in the list of search results, to the patient currently being viewed
5. Every patient's details view has a unique url at /patient/:id
6. Search (or filter) for patients by name within the list of patients

## Setup instructions

Run in the repository root: `npm install && npm start`

The application should start at localhost:3000. Hot reloading is enabled on file changes. If you add or remove files (especially .less files), it might be necessary to restart.

## Project structure

Short description of what lives under `src/`.

### components

All the UI components are here. Every folder is a single component, which exports an index.ts file. It may also have a .less file.

`<HomePage>` is the "main" component of the application.

### store

Everything related to the Redux store goes here.

### types

In the future, types applicable only to a single component would go in that component's folder, and only global or cross-component types would go here, I think, but open to suggestions.
### utils

These are intendend to be constants and helper methods used across components / areas of the application.

## Process Reflection

I started with Create React App's TypeScript template, added eslint and prettier, then switched from yarn to npm and added LESS compilation as per instructions. For a production-grade application, building a custom React setup from scratch with only the dependencies we actually need, may be worth considering.

Similarly, in the pure interest of time, I chose to use antd's UI components because I am already very familiar with them.

I have experience building production applications with Redux, but not specifically the redux-toolkit way, so this was something new - it seemed worth trying given that it was the recommendation in the official React documentation.

I do not have production experience with LESS, so am not fluent in the best practices and optimal structure. I vaguely remember some things about BEM notation but a proper refresh would require more time.

## Known Issues

According to the instructions, I have timeboxed this assignment to one working day. The following known issues or limitations would be explored / implemented if there was more time available for the task, or if this was intended to be a production-ready application.

Some of such issues have been noted down directly in code comments, more generic ones are listed below.

If the reader discovers additional issues that have not been accounted for here, please feel free to raise them!

### Bugs

I have noticed a few UI-related bugs that seem to be related to the usage or internals of the antd components:

1. Sometimes tooltips get stuck and fails to disappear when adding / removing a medication from the patient
2. The width of the two columns in the patient details view should be the same / consistent across patients as well as when adding or removing medications, but it is not
3. The width of the patients list also "jumps" when going in and out of the "patient not found" view
4. Clicking outside the create / edit modal should probably close the modal
5. Medications with very long names cannot be removed from the edit view

### Refactoring and improvements

1. Adding unit tests for everything (priority #1!)
2. Clean up dependencies in package.json to only include the ones that actually ended up being used
3. Creating a generic form-builder / generator, and generating a separate "create" and "edit" patient forms. I think this would be cleaner and also more scalable
4. Alternatively, consider implementing inline editing of individual properties in the details grid itself rather than as a modal that updates the entire patient object at once just like creation
5. Looking into LESS best practices and implementing them: folder structure, naming conventions, build process, etc

### Additional features

1. A more thorough consideration of validation logic around the patient create / edit form input fields
2. A warning popup when deleting a patient: "are you sure?"
3. Consider what else can be used to ensure uniqueness of patient objects besides a uuid, and if that property can be used also for a more descriptive url to the patient's details view
4. Pre-populating a list of fake patients on application start
5. Look into server side rendering
6. Adding, removing and searching for medications directly in the patient create / edit modal
7. Ensuring mobile-friendliness of layout
8. Improving the data storage: either implementing a backend, or at the very least, trying out a mechanism of persisting the redux store between page reloads
9. Allowing the possibility of showing more information about the medications returned from the API, than just its name
10. Make not just the patient's name searchable
