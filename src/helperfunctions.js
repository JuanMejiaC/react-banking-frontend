function keyCodes (ky) {
  if(
    ky == 8                 || //backspace
    ky == 9                 || //Tab
    ky == 13                || // enter
    ky >= 16  && ky <= 20   || //shift, ctrl, alt, pause/break, caps lock, escape
    ky == 27                || //escape
    ky >= 33 && ky <= 40    || //page up, page down, end, home, left up right down arrow
    ky >= 45 && ky <= 46    || //insert, delete
    ky >= 48 && ky <= 57    || // keyboard 0-9
    ky >= 91 && ky <= 93    || // left window key, right window key, select key
    ky >= 96 && ky <= 105   || //numpad 0-9
    ky >= 106 && ky <= 123  || //mult, add, sub, deci point, divide, f1-f12
    ky >= 144 && ky <= 145  || // num lock, scroll lock
    ky >= 186 && ky <= 192  || // semi colon, equal sign, comma, dash, period, forward slash, grave accent
    ky >= 219 && ky <= 222     // open bracket, back slash, close braket, single quote
    ) {
      return true;
  }
  return false;
}

const formatToCurrency = (valToFormat) => {
      // split the string return array
      valToFormat = valToFormat.split("");
      // get the index of the decimal point
      let letIndexOf = valToFormat.indexOf(".");
      
      if(letIndexOf >= 0) {
        // delete the decimal point from the array
        valToFormat.splice(letIndexOf, 1);
      }
      valToFormat = valToFormat.join("");
      return parseFloat(parseFloat(valToFormat) / 100).toFixed(2);
}

export {keyCodes, formatToCurrency};