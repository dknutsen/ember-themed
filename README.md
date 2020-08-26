ember-themed
==============================================================================

Simple, lightweight theming abstraction for your Ember app. Easily configure one or more themes and apply to the desired elements just by adding a modifier.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-themed
```

Add themes to `app/themes.js` and make sure to set a default theme in `app/services/ember-themed'.

Optionally give the user a way to change their theme (see service API below).


Usage
------------------------------------------------------------------------------

The addon blueprint will add two files to your project:

- `app/themes.js` - This is where you will define your themes.
- `app/services/ember-themed.js` - This is where you set your default theme and it provides the glue for connecting your custom themes with the rest of the addon.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
