[![This project uses GitHub Actions for continuous integration.](https://github.com/dknutsen/ember-themed/workflows/CI/badge.svg)](https://github.com/dknutsen/ember-themed/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/ember-themed.svg)](https://badge.fury.io/js/ember-themed)

ember-themed
==============================================================================

Simple, lightweight theming abstraction for your Ember app. Easily configure one or more themes and apply to the desired elements just by adding a modifier.

Features:

- Declarative modifier-based syntax
- Tiny: requires only a modifier, a service, and a themes file
- Easily configure auto-detection/matching of user's OS theme (light/dark mode)
- Agnostic to CSS framework and markup 

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above
* Embroider compatible


Installation
------------------------------------------------------------------------------

```
ember install ember-themed
```

Add themes to `app/themes.js` and consider setting a default theme and/or matching the system theme (see [the docs for more details](https://dknutsen.github.io/ember-themed)).


Using the modifier
------------------------------------------------------------------------------

To apply a theme style to an element or component simply add the `{{themed}}` modifier with optional style and/or variant options:
```
<div class="fancy-alert" {{themed "callout" "danger"}}>
  Error: This is a big scary alert that always matches the current theme!
</div>
```


Documentation & Demo
------------------------------------------------------------------------------

See the [docs and demo pages](https://dknutsen.github.io/ember-themed) for more details on configuring and using the addon.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
