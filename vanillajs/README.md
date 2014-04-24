Vanilla JS
==========

This is a pure JavaScript application based on the [TodoMVC implementation](https://github.com/tastejs/todomvc/tree/gh-pages/vanilla-examples/vanillajs).

Get started
===========

See the [visual regression test suite](RegressionRunner.html) and [all test cases](test/ui/).

Launch [`src/index.html`](src/index.html) to open the application.

What is to see here?
====================

Looking at [`test/ui/vanilla_single_active_entry.html`](test/ui/vanilla_single_active_entry.html) you'll see a test case includes

- linked CSS under test,
- some HTML mimicing the production environment,
- the application's JavaScript dependencies, and
- initializing code to manipulate the view for the desired test.

Dynamic view
------------

Most views out there need JavaScript to manipulate the DOM structure from the plain HTML page. Triggering this in tests can be made straightforward if you [separate the DOM from your business logic](http://martinfowler.com/bliki/PresentationDomainSeparation.html). The TodoMVC application has been refactored to follow this principle and so the view here can be easily executed. The controller or persistance layer is not needed in the tests.

Test case [`test/ui/vanilla_single_active_entry.html`](test/ui/vanilla_single_active_entry.html) shows a manipulated view object which is being passed an active entry, that is then reflected in the DOM.

```js
var template = new app.Template(),
    view = new app.View(template);

view.render('showEntries', [{
    title: 'an active entry',
    completed: false
}]);

```

A word on the HTML
------------------

Testing your CSS is only meaningful if integrated with your HTML structure. If you have some static HTML but no client-side template loading mechanism (just like the vanilla application here), then there's a challenge in getting your production code into the test.

For the sake of simplicity we just create a test fixture (copying the parts under test from production code). Start with this approach yourself if you want. However, your tests will be much more meaningful if you are able to test the actual production HTML. One way of achieving this is introducing a templating system that allows partials that can then be independently tested.

Wiring together
---------------

The browsers limit the paths accessible out of same-origin restrictions. This makes wiring up the test suite a tiny bit more complicated. Let's look at [`test/ui/vanilla_single_active_entry.html`](test/ui/vanilla_single_active_entry.html) for example. While the document sits under `test/ui/` the application is found under `../../src/` relativly from there. If we linked like that, Firefox would complain about accessing a restricted path. Instead we apply a small tweak. We create a symbolic link in the `test/ui/` directory via

```sh
$ ln -s ../../src test/ui/src
```

from the project's root directory and link to `src/` inside the document. This allows us to write the following:

```html
<link rel="stylesheet" href="src/base.css">
```

If the `RegressionRunner.html` file is served through a (local) web-server, this will not be an issue whatsoever.
