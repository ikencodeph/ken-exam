## Author
* Kenny Lowell M. Ngaosi
## Outlined explanation and justification of the travel app
* The web app was build using Laravel and Vue (Mix)
* Bootstrap-vue was used to beautify the Front-end
* Vuex was used in order to "store and share reactive data across the app without trading off performance, testability or maintainability"
* Takes advantage of the state, actions, getters, and mutations of vuex to organize the different capabilities of the app and separate them as modules
* All partner APIs were called in the backend to prevent exposing sent keys and app secrets
* Design is simplified and does not including additional resources that might sacrifice the performance of the web app
* In the backend, based on component structure, each module has their own controller
