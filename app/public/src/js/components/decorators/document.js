function DocumentEvent( typeEvent = '' ) {
  
  return function( target, propertyKey = '', descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function () {
      document.addEventListener(typeEvent, originalMethod);
    };

    return descriptor;
  }

}

module.exports = {
    DocumentEvent
}