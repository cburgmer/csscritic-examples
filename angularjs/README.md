AngularJS
=========

This is an [AngularJS](http://angularjs.org/)-based application derived from the [TodoMVC implementation](https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/angularjs).

Get started
===========

See the [visual regression test suite](RegressionRunner.html) and [all test cases](test/ui/).

Launch [`src/index.html`](src/index.html) to open the application. Note though that this will not work for `file://` access in some browsers.

What is to see here?
====================

AngularJS applications have an ingrained support for the "separation of concerns" principle. As such setting up view tests is pretty simple.

Looking at [`test/ui/ng_single_active_entry.html`](test/ui/ng_single_active_entry.html) you'll see a test case includes

- the linked CSS,
- a HTML template,
- the AngularJS dependency,
- a mocked out controller and
- the application bootstrap helper.

The real controller, the application object or any persistance layer is not needed in the tests.

Modular HTML
------------

The application consists of different partial templates that represent a component each. A template can easily be included using

```html
<ng-include src="'templates/MY_TEMPLATE.html'"></ng-include>
```

This allows the test cases to include production code for HTML (CSS and JS are naturally easy to link in). Also, this helps structure the HTML into small components that can be tested independently.

There is one issue with template includes: paths in AngularJS' includes are not relative to the including HTML file (violating the pattern defined by CSS), but relative to the outer document running the application. Thus a cascaded of template partials is difficult to include. One solution can be seen in [`test/ui/ng_initial_view.html`](test/ui/ng_initial_view.html). Here the partials that we do not want to test are "mocked out" using an empty template:

```html
<script type="text/ng-template" id="templates/list.html"></script>
```

Dynamic view
------------

Most views only become completly rendered after some JavaScript code has run manipulating the view state. Triggering this in tests is straightforward with Angular.

Test case [`test/ui/ng_single_active_entry.html`](test/ui/ng_single_active_entry.html) shows a mocked controller manipulating the injected `$scope` object, that is then reflected in the view

```js
function TodoCtrl($scope) {
    $scope.todos = [{
        title: 'an active entry',
        completed: false
    }];
}
```

Setting up a production-like HTML tree
--------------------------------------

The TodoMVC application was not designed with independent components in mind. Thus testing parts of the components is not straightforward. For example, the correct styling is only applied if the TODO item list is included in a `#main` section again included in `#todoapp`. The test case is careful to mimic the tree as it exists in the live application.

```html
<section id="todoapp" ng-controller="TodoCtrl">
    <section id="main">
        <ng-include src="'src/templates/list.html'"></ng-include>
    </section>
</section>
```

In a clearly-separated component such setup would probably not be needed.

AngularJS bits
--------------

The test cases create an alternative application using their own controller. This allows for writing slim test cases keeping out any code that we do not want to test.

The application is bootstrapped by calling

```js
angular.bootstrap(document.querySelector('html'));
```

while the controller is either referenced in the included template, or is manually invoked inside the test

```html
<section id="todoapp" ng-controller="TodoCtrl">
```

One special treatment is needed in addition, as AngularJS by default catches errors thrown in the application without reporting them back. To allow CSS Critic to inform you about errors in your setup, the [`test/ui/angular_testhelper.js`](test/ui/angular_testhelper.js) makes sure to rethrow errors otherwise hidden away.

Wiring together
---------------

The browsers limit the paths accessible out of same-origin restrictions. This makes wiring up the test suite a tiny bit more complicated. Let's look at [`test/ui/ng_single_active_entry.html`](test/ui/ng_single_active_entry.html) for example. While the document sits under `test/ui/` the application is found under `../../src/` relativly from there. If we linked like that, Firefox would complain about accessing a restricted path. Instead we apply a small tweak. We create a symbolic link in the `test/ui/` directory via

```sh
$ ln -s ../../src test/ui/src
```

from the project's root directory and link to `src/` inside the document. This allows us to write the following:

```html
<link rel="stylesheet" href="src/base.css">
```

If the `RegressionRunner.html` file is served through a (local) web-server, this will not be an issue whatsoever.
