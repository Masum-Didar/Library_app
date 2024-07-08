import { Application } from "@hotwired/stimulus";
// import { definitionsFromContext, eagerLoadControllersFrom, lazyLoadControllersFrom } from "@hotwired/stimulus-loading";
import "controllers";
import "@popperjs/core";
import "bootstrap";


const application = Application.start();
// const context = require.context("controllers", true, /_controller\.js$/);
// application.load(definitionsFromContext(context));

// Configure Stimulus development experience
application.debug = false;
window.Stimulus = application;

export { application };

// eagerLoadControllersFrom("controllers", application);

