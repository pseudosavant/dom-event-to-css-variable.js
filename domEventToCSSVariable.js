(function(global){
  /*
  dom-event-to-css-variable.js: expose element event values (offsetX, nodeName, etc) to CSS
  © 2021 Paul Ellis
  License: MIT
  Version: 1.1
  */

  function domEventToCSSVariable(el, prop, opts) {
    const eventOpts = (opts ? Object.assign({}, opts) : {});
    eventOpts.passive = true;
    eventOpts.event = eventOpts.event || 'mousemove';

    const transformFn = (eventOpts.transform ? eventOpts.transform : typeCoerce);
    const targetEl = (eventOpts.target ? eventOpts.target : el);

    const baseName = eventOpts.cssVarName || prop;
    const propName = `--${camelToKebabCase(baseName)}`;

    function eventFn(e) {
      const transformedVal = transformFn(
        isDefined(e[prop]) ?
        e[prop] :
        e.target[prop], el, e
      );

      const val = (
        eventOpts.stringify ?
        JSON.stringify(transformedVal.toString()) :
        transformedVal
      );

      targetEl.style.setProperty(propName, val);
    }

    el.addEventListener(eventOpts.event, eventFn, eventOpts);
  }

  function camelToKebabCase(s) {
    return s.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
  }

  function isDefined(v) {
    return typeof v !== 'undefined';
  }

  function typeCoerce(v) {
    return (v == +v ? +v : v);
  }

  global.domEventToCSSVariable = domEventToCSSVariable;
})(this);
