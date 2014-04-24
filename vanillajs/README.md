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

Looking at [`test/ui/vanilla_single_active_entry.html`](test/ui/vanilla_single_active_entry.html) you'll see a test case includes the linked CSS, a HTML fixture and some JavaScript view code. A desired (and dynamic) page state can then easily be created via manipulating the view object. The controller or persistance layer is not needed in the tests.

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
