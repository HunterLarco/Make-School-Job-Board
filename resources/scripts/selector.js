(function(){
  
  function Selector(){
    var self = this;
    
    
    var autocompletevalues = [];
    
    var frame;
    var input;
    var autocomplete;
    
    var placeholder;
    
    var saved = [];
    
    
    self.getValues = GetValues;
    self.getPartialValue = GetPartialValue;
    
    self.onchange = new Function();
    
    
    function GetValues(){
      return saved.map(function(item){return item.lang;});
    }
    function GetPartialValue(){
      return input.innerHTML.replace(/&nbsp/g, ' ');
    }
    
    
    function OnFocus(){
      input.focus();
    }
    
    function OnKeyDown(event){
      var keycode = event.keyCode;
      var character = String.fromCharCode(keycode);
      if(!character.match(/[a-zA-Z0-9\-\_\s]/)) character = '';
      
      var value = input.innerHTML + character;
      if(keycode == 8) value = value.slice(0,-1);
      
      if(keycode == 13){
        event.preventDefault();
        AddSaved();
      }else{
        AutoComplete(value);
      }
    }
    function OnKeyUp(){
      AutoComplete(input.innerHTML);
    }
    
    function AddSaved(){
      var value = input.innerHTML;
      if(!value) return;
      
      var lang = GetExpectedValue(value);
      if(!lang) lang = value;
      
      var item = document.createElement('div');
      item.setAttribute('class', 'item');
      item.innerHTML = lang;
      item.lang = lang;
      
      item.addEventListener('click', function(){
        RemoveItem(item);
      });
      
      saved.push(item);
      frame.insertBefore(item, input);
      
      input.innerHTML = '';
      autocomplete.innerHTML = placeholder;
      
      self.onchange(self);
    }
    function RemoveItem(item){
      item.parentElement.removeChild(item);
      
      var index = saved.indexOf(item);
      if(index == -1) return;
      saved.splice(index, 1);
      
      self.onchange(self);
    }
    
    function GetExpectedValue(value){
      value = value.toLowerCase().replace(/&nbsp;/g, ' ');
      
      var vals = [];
      for(var i=0,val; val=autocompletevalues[i++];)
        if(val.toLowerCase().indexOf(value) == 0)
          vals.push(val);
      
      return vals[0];
    }
    function AutoComplete(value){
      if(!value){
        autocomplete.innerHTML = placeholder;
        return;
      }
      
      autocomplete.innerHTML = '';
      value = value.replace(/&nbsp;/g, ' ');
      
      var lang = GetExpectedValue(value);
      if(!lang) return;
      
      autocomplete.innerHTML = lang.slice(value.length).replace(/\s/g, '&nbsp;');
    }
    
    function CreateInputField(){
      input = document.createElement('span');
      input.setAttribute('contenteditable', 'true');
      frame.appendChild(input);
      
      autocomplete = document.createElement('label');
      autocomplete.innerHTML = placeholder;
      frame.appendChild(autocomplete);
    }
    
    
    (function Constructor(elem, _autocompletevalues){
      autocompletevalues = _autocompletevalues.sort();
      
      frame = elem;
      frame.innerHTML = '';
      
      placeholder = frame.getAttribute('placeholder') || '';
      CreateInputField();
      
      frame.addEventListener('focus', OnFocus);
      input.addEventListener('keydown', OnKeyDown);
      input.addEventListener('keyup', OnKeyUp);
    }).apply(this, arguments);
  }
  
  window.Selector = Selector;
  
})();