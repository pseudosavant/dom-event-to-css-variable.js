# dom-event-to-css-variable.js

Simple library to expose DOM event values as CSS Custom Properties (variables)

See demo: https://dom-event-to-css-variable.glitch.me/

## Supported Features

* Set CSS Custom Properties (variables) on an element when DOM events fire for it
* DOM/Event keys are converted to kebab-case (`DOM`/`js`:`offsetX` ➡ `css`:`offset-x`)
* Use a custom CSS Custom Property name (e.g. `--width` instead of `--offset-width`)
* Listen for any event (default: `mousemove`)
* Read values from the event (i.e. `offsetWidth`), or the element (i.e. `nodeName`)
* Converts numbers in strings to number type in CSS - useful for showing numbers in pseudo-element `content`
* Supports custom value transform functions: `tranformFn(val, el, e)`

## Options

* `event` (`String`): name of the DOM event to listen for (default: `mousemove`)
* `once` (`Boolean`): should the listener only fire once? Better performance for values that won't change (e.g. element width, nodeType, etc).
* `target` (`DOM element`): specify which target DOM element the CSS variables are set on
* `cssVarName` (`String`): change the CSS Custom Property (variable) name to a custom value (e.g. `--width` instead of `--offset-width`)
* `stringify` (`Boolean`): should the value be forced to a string (or not) in CSS? (Useful for show numeric values (e.g. `nodeType`) in CSS `content`)
* `transform` (`function`): function that takes `value`, `element`, and `event` as input and returns the desired CSS variable value. e.g. `transformFn(value, element, event)`


## Why?

* Change how something is styled/positioned based on:
  * Current mouse location
  * Video playback position
  * Last position that was clicked

## How to use
### Simple
#### Set the `background-position` to the current mouse location
##### JavaScript
```js
const $domElement = document.querySelector('.myElement');
domEventToCSSVariable($domElement, 'offsetX');
domEventToCSSVariable($domElement, 'offsetY');
```

##### CSS
```css
.myElement {
  /* Set the `background-position` to the current mouse location */
  background-position: calc(var(--offset-x) * 1px) calc(var(--offset-y) * 1px);
}
```

### Advanced

#### Set the `background-position` to the mouse location the last time it was clicked
##### JavaScript
```js
/* Custom CSS variable name, trigger on `mousedown` instead of the default (`mousemove`) */
domEventToCSSVariable($domElement, 'offsetX', {
  event: 'mousedown',
  cssVarName: 'last-click-x'
});

domEventToCSSVariable($domElement, 'offsetY', {
  event: 'mousedown',
  cssVarName: 'last-click-y'
});
```

##### CSS
```css
.myElement {
  /* Set the `background-position` to the mouse location the last time it was clicked */
  background-position: calc(var(--last-click-x) * 1px) calc(var(--last-click-y) * 1px);
}
```

#### Set the child padding to 12.5% of `.myElement` width
##### JavaScript
```js
/* Use a custom CSS variable name, only trigger it once */
domEventToCSSVariable($domElement, 'offsetWidth', {
  once: true,
  cssVarName: 'width'
});
```

##### CSS
```css
.myElement > .child {
  /* Set the child padding to 12.5% of .myElement width */
  padding: calc(var(--width) * 1px * 0.125);
}
```

#### Show what kind of node (`DIV`, `UL`, etc) the element is
##### JavaScript
```js
/* Get value of `nodeName` and `nodeType` on `$domElement`, when `dblclick` is triggered (instead of the default `mousemove`), on trigger once (value won't change in this example), convert the value to lowercase */
domEventToCSSVariable($domElement, 'nodeName', {
  event: 'dblclick',
  once: true,
  transform: (val, el, e) => `<${val.toString().toLowerCase()}>`;
}); // `nodeName` will be a lowercase string in CSS because the value is a string

domEventToCSSVariable($domElement, 'nodeType', {
  event: 'dblclick',
  once: true,
  stringify: true
}); // `nodeType` will be a number in CSS because the value is a number

domEventToCSSVariable($domElement, 'nodeType', {
  event: 'dblclick',
  once: true,
  stringify: true,
  cssVarName: 'nodeTypeString'
}); // Force `nodeType` to be a string in CSS, inspite of it being a number
```

##### CSS
```css
.myElement::after {
  /* Show what kind of node (DIV, UL, etc) the element is */
  content: var(--nodeName); /* e.g. <div> */
}
```

## License
MIT

&copy; 2021 Paul Ellis