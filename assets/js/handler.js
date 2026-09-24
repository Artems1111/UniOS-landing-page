'use strict'
//-----------------------------------------------------Translating Script (i18n)-----------------------------------------------------------


//configure language
function getLanguage() {
    //gets language from browser settings
    return navigator.language;
}


function choose_language(){
    //takes the input of the select element and returns it
    return document.querySelector("option").textContent;
}

//fetch dictionary
async function read_dictionary(lang){
    if (lang==null){
        lang = choose_language();
    }
        
    const response = await fetch(`locales/${lang}.json`);

     if(!response.ok){
        return {};
    }

    const translation = await response.json();

    return translation;
    
}
//cache
const dict = read_dictionary()

//translating
function translating(dict){
    elements = document.querySelectorAll("[data-i18n]");

    for(const element of elements){
        var key = element.dataset.i18n;
        var text = dict[key];  
        
        element.textContent = text;
    }
}

function toggleLangTag() {
    //change the language tag of index.html
  if (document.documentElement.lang !== this._lang) {
    document.documentElement.lang = this._lang;
  }
}
