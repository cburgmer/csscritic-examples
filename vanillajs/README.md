Vanilla JS
==========

This is a pure JavaScript application based on the [TodoMVC implementation](https://github.com/tastejs/todomvc/tree/gh-pages/vanilla-examples/vanillajs).

Get started
===========

Install dependencies

    $ bower install

See the [visual regression test suite](RegressionRunner.html).

Launch [src/index.html](src/index.html) to open the application.

What is to see here?
====================

The application is cleanly split into a controller, model and view. This makes visual testing very easy as we can indendently manipulate the view for testing purposes.

Looking at the [UI test cases](test/ui) you'll see that apart from helper code only the view is needed in tests. A desired page state can then easily be created via manipulating the view object.
