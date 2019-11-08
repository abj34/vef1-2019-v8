const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka

    const button = items.querySelectorAll('.item__button');
    for (takki of button) {
      takki.addEventListener('click', deleteItem);
    }

    const checkbox = items.querySelectorAll('.item__checkbox');
    for (takki of checkbox) {
      takki.addEventListener('click', finish);
    }

    const text = items.querySelectorAll('.item__text');
    for (takki of text) {
      takki.addEventListener('click', finish);
    }
  }

  function formHandler(e) {
    e.preventDefault();

    console.log('halló heimur');

    const form = document.querySelector(".form");
    const data = new FormData(form);
    let reg = new RegExp("^\\s*$");
    if (reg.test(data.get("text"))) {
      return;
    }
    add(data);
    form.querySelector('.form__input').value = "";
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const text = e.target.parentNode;
    if (e.target.checked){
      text.classList.add('item--done');
    }
    else {
      text.classList.remove('item--done');      
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const newInput = document.createElement('input');
    newInput.value = e.target.innerHTML;
    newInput.classList.add('item__edit');
    newInput.addEventListener("keydown", event => {
    if (event.code == 'Enter') {commit(newInput)};});
    e.target.parentNode.replaceChild(newInput, e.target);
    newInput.focus();
    newInput.autofocus = true;   
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const newText = document.createElement('p');
    newText.classList.add('item__text');
    newText.innerHTML = e.value;
    newText.addEventListener('click', edit);
    e.parentElement.replaceChild(newText, e);
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const newItems = document.createElement("li");
    newItems.classList.add("item");
    items.appendChild(newItems);
    
    const newCheckbox = el("input", "item__checkbox", finish);
    newCheckbox.setAttribute('type', 'checkbox')
    newItems.appendChild(newCheckbox);

    const newText = el ('p', 'item__text', edit)
    newText.innerHTML = value.get("text");
    newItems.appendChild(newText);

    const newButton = el('button', 'item__button', deleteItem)
    newButton.innerHTML = "Eyða";
    newItems.appendChild(newButton);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentElement.remove();
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const x = document.createElement(type);
    x.classList.add(className);
    x.addEventListener('click', clickHandler);
    return x;
  }

  return {
    init: init
  }
})();
