let buttons = document.querySelectorAll("button");
let field1 = document.getElementById("field1");
let field2 = document.getElementById("field2");
let nmbr = 0;
let symbols = ["+", "-", "*", "/", "%"];

function myfunc() {
  try {
    var anw = eval(field1.value);
    if (nmbr != 0) {
      field1.value = "";
      field2.value = anw;
    } else if (anw) {
      field2.value = anw;
      field1.placeholder = field1.value;
    } else if (field1.value == "0" || anw == 0) {
      field2.value = 0;
      field1.placeholder = field1.value;
    }
  } catch (error) {
    field2.value = "";
  }
}

function slash(field) {
  var b = 0;
  for (let d = 0; d < symbols.length; d++) {
    let element = symbols[d];
    let m = field.value.split(element);
    if (m.length > 1) {
      b += 1;
    }
  }
  if (b) {
    return false;
  } else {
    return true;
  }
}

function myfunc2() {
  field1.value = "";
  field2.value = "";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    nmbr = 0;
    if (button.id == "C") {
      field1.placeholder = "";
      myfunc2();
      field2.classList.remove("runup");
    } else if (button.id == "cl") {
      field1.value = field1.value.substring(0, field1.value.length - 1);
      field1.placeholder = "";
      if (field1.value.length == 1) {
        myfunc2();
      } else {
        field2.value = "";
      }
    } else if (button.id == "=") {
      if (field1.value.length != 0) {
        field1.value = "";
        field2.classList.add("runup");
      }
    } else if (button.id == "sq") {
      if (field1.value.length >= 1 && slash(field1)) {
        field1.value = field1.value + "*" + field1.value;
        nmbr = eval(field1.value);
        field1.placeholder = field1.value;
      }
    } else if (symbols.includes(button.id)) {
      if (field1.value.length != 0) {
        if (symbols.includes(field1.value.charAt(field1.value.length - 1))) {
          field1.value = field1.value.substring(0, field1.value.length - 1);
        }
        field1.value = field1.value + button.id;
      }
    } else if (button.id == "." && field1.value.length == 0) {
      field2.classList.remove("runup");
      field1.value = "0.";
    } else {
      if (field1.value.length == 0) {
        field2.classList.remove("runup");
      }
      field1.value = field1.value + button.id;
    }
    myfunc();
  });
});
