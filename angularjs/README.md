AngularJS
=========

This is an [AngularJS](http://angularjs.org/)-based application derived from the [TodoMVC implementation](https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/angularjs).

Get started
===========

See the [visual regression test suite](RegressionRunner.html).

Launch [`src/index.html`](src/index.html) to open the application.

What is to see here?
====================

AngularJS applications have an ingrained support for the "separation of concerns" principle. As such setting up view tests is pretty simple.

Looking at [`test/ui/single_active_entry.html`](test/ui/single_active_entry.html) you'll see a test case includes the linked CSS, a HTML template, the AngularJS dependency and a mocked out controller. A desired (and dynamic) page state can then easily be created via manipulating the scope that is injected into the controller by AngularJS. The real controller, the application object or any persistance layer is not needed in the tests.

Modular HTML
------------

The application consists of different partial templates that represent a component each. A template can easily be included using

    <ng-include src="'templates/MY_TEMPLATE.html'"></ng-include>

This allows the test cases to include production code for HTML (CSS and JS are naturally easy to link in). Also, this helps structure the HTML into small components that can be tested independently.

There is one issue with template includes: paths in AngularJS' includes are not relative to the including HTML file (violating the pattern defined by CSS), but relative to the outer document running the application. Thus a cascaded of template partials is difficult to include. One solution can be seen in [`test/ui/initial_view.html`](test/ui/initial_view.html). Here the partials that we do not want to test are "mocked out" using an empty template:

    <script type="text/ng-template" id="templates/list.html"></script>

Setting up a production-like HTML tree
--------------------------------------

The TodoMVC application was not designed with independent components in mind. Thus testing parts of the components is not straight forward. For example, the correct styling is only applied if the TODO item list is included in a `#main` section again included in `#todoapp`. The test case is careful to mimic the tree as it exists in the live application.

    <section id="todoapp" ng-controller="TodoCtrl">
        <section id="main">
            <ng-include src="'src/templates/list.html'"></ng-include>
        </section>
    </section>

In a clearly-separated component such setup would probably not be needed.
