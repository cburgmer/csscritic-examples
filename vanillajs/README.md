Vanilla JS
==========

This is a pure JavaScript application based on the [TodoMVC implementation](https://github.com/tastejs/todomvc/tree/gh-pages/vanilla-examples/vanillajs).

Get started
===========

See the [visual regression test suite](RegressionRunner.html) and [all test cases](test/ui/).

Launch [`src/index.html`](src/index.html) to open the application.

What is to see here?
====================

The application is cleanly split into a controller, model and view. This makes visual testing very easy as we can indendently manipulate the view for testing purposes.

Looking at [`test/ui/single_active_entry.html`](test/ui/single_active_entry.html) you'll see a test case includes the linked CSS, a HTML fixture and some JavaScript view code. A desired (and dynamic) page state can then easily be created via manipulating the view object. The controller or persistance layer is not needed in the tests.
