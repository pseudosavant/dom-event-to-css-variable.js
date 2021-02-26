(function(global){
  /*
  dom-event-to-css-variable.js: expose element event values (offsetX, nodeName, etc) to CSS
  © 2021 Paul Ellis
  License: MIT
  Version: 1.1.1
  */

  function domEventToCSSVariable(el, prop, opts) {
    const eventOpts = Object.assign({}, opts);
    eventOpts.passive = true; // using `e.preventDefault()` has no effect if passive === true. Improves performance for some events.
    eventOpts.event   = eventOpts.event || 'mousemove';

    const transformFn = (eventOpts.transform ? eventOpts.transform : typeCoerce);
    const targetEl    = (eventOpts.target    ? eventOpts.target    : el);

    const baseName = eventOpts.cssVarName || prop;
    const propName = `--${camelToKebabCase(baseName)}`;

    function eventFn(e) {
      const whichProp = (isDefined(e[prop]) ? e[prop] : e.target[prop]);
      const transformedVal = transformFn(whichProp, el, e);

      const val = (
        eventOpts.stringify ?
        JSON.stringify(transformedVal.toString()) :
        transformedVal
      );

      targetEl.style.setProperty(propName, val);
    }

    el.addEventListener(eventOpts.event, eventFn, eventOpts);
  }

  const camelToKebabCase = (s) => s.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
  const isDefined        = (v) => typeof v !== 'undefined';
  const typeCoerce       = (v) => (v == +v ? +v : v);

  global.domEventToCSSVariable = domEventToCSSVariable;
})(this);