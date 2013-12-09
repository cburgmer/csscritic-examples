AngularJS
=========

This is an [AngularJS](http://angularjs.org/)-based application derived from the [TodoMVC implementation](https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/angularjs).

Get started
===========

See the [visual regression test suite](RegressionRunner.html).

Launch [`src/index.html`](src/index.html) to open the application.

What is to see here?
====================

AngularJS applications have an ingrained support for the "separation of concerns" principle. As such setting up view tests is very simple.

Looking at [`test/ui/single_active_entry.html`](test/ui/single_active_entry.html) you'll see a test case includes the linked CSS, a HTML fixture, the AngularJS dependency and a mocked out controller. A desired (and dynamic) page state can then easily be created via manipulating the scope that is injected into the controller by AngularJS. The real controller, the application object or any persistance layer is not needed in the tests.
