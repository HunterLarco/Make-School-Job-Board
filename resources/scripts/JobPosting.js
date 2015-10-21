(function(){

  window.addEventListener('load', InitParse);
  function InitParse(){
    Parse.initialize('key1', 'key2');
  }
  

  const undefined;
  const EntityModel = Parse.Object.extend('JobPosting');
  

  function JobPosting(){
    var self = this;
    
    
    var id;
    var attributes;
    
    var html;
    
    
    self.cardHTML = CardHTML;
    
    
    function CardHTML(){
      if (html !== undefined) return html;
      
      var card = document.createElement('card');
      card.setAttribute('class', 'card');
      
      var h1 = document.createElement('h1');
      h1.innerHTML = attributes.company;
      
      var h2 = document.createElement('h2');
      h2.innerHTML = attributes.title;
      
      var line = document.createElement('div');
      line.setAttribute('class', 'line');
      
      var urllink = document.createElement('a');
      urllink.setAttribute('target', 'blank');
      urllink.setAttribute('href', attributes.url);
      
      var h3url = document.createElement('h3');
      h3url.innerHTML = attributes.url;
      
      var emaillink = document.createElement('a');
      emaillink.setAttribute('target', 'blank');
      emaillink.setAttribute('href', 'mailto:'+attributes.contact.fullname+' <'+attributes.contact.email+'>');
      
      var h3email = document.createElement('h3');
      h3email.innerHTML = 'Email Contact';
      
      var line2 = document.createElement('div');
      line2.setAttribute('class', 'line');
      
      var p = document.createElement('p');
      p.innerHTML = attributes.notes;
      
      card.appendChild(h1);
      card.appendChild(h2);
      card.appendChild(line);
      card.appendChild(urllink);
        urllink.appendChild(h3url);
      card.appendChild(emaillink);
        emaillink.appendChild(h3email);
      card.appendChild(line2);
      card.appendChild(p);
      
      html = card;
      return card;
    }
    
    
    (function Constructor(data){
      if(data === undefined) throw 'Parameter Missing';
      id = data.id;
      attributes = data.attributes;
    }).apply(this, arguments);
  }
  
  
  JobPosting.create = function Create(obj, onsuccess, onfailure){
    if(obj.title    === undefined ||
       obj.company  === undefined ||
       obj.url      === undefined ||
       obj.stack    === undefined ||
       obj.fullname === undefined ||
       obj.email    === undefined ||
       obj.notes    === undefined)
      throw 'Parameter missing';
    
    var job = new EntityModel();
    job.save({
      title   : obj.title,
      company : obj.company,
      url     : obj.url,
      stack   : obj.stack,
      contact : {
        fullname : obj.fullname,
        email    : obj.email
      },
      notes  : obj.notes
    }).then(function(object) {
      if(typeof onsuccess === 'function') onsuccess(new JobPosting(object));
    }, function(){
      if(typeof onfailure === 'function') onfailure();
      else console.warn('Create failed.')
    });
  }
  JobPosting.all = function GetAll(onsuccess, onfailure){
    new Parse.Query(EntityModel).find().then(function(data){
      if(typeof onsuccess === 'function')
        onsuccess(data.map(function(value){
          return new JobPosting(value);
        }));
    }, function(){
      if(typeof onfailure === 'function') onfailure();
      else console.warn('GetAll failed.')
    })
  }


  window.JobPosting = JobPosting;

})();