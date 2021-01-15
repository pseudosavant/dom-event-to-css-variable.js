(function(global){
  /*
  dom-event-to-css-variable.js: expose element event values (offsetX, nodeName, etc) to CSS
  © 2021 Paul Ellis
  License: MIT
  Version: 1.0
  */

  function domEventToCSSVariable(el, prop, opts) {
    const eventOpts = (opts ? Object.assign({}, opts) : {});
    eventOpts.passive = true;
    eventOpts.event = eventOpts.event || 'mousemove';
    
    const baseName = eventOpts.cssVarName || prop;
    const propName = `--${camelToKebabCase(baseName)}`;
  
    function eventFn(e) {
      const whichVal = (isDefined(e[prop]) ? e[prop] : e.target[prop]);

      const shouldStringify = (isDefined(eventOpts.stringify)) ? eventOpts.stringify : isString(whichVal);
      const val = (shouldStringify ? JSON.stringify(whichVal.toString()) : whichVal);
      
      el.style.setProperty(propName, val);
    }

    el.addEventListener(eventOpts.event, eventFn, eventOpts);
  }
  
  function camelToKebabCase(s) {
    return s.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
  }

  function isDefined(v) {
    return typeof v !== 'undefined';
  }

  function isString(v) {
    return typeof v === 'string';
  }
  
  global.domEventToCSSVariable = domEventToCSSVariable;
})(this);