'use strict'

//-----------------------------------------------------Translating Script (i18n)-----------------------------------------------------------

// cache
const cache = {};


//orchestrator function
async function init_i18n(){
    let lang = getLanguage();

    let dict = await read_dictionary(lang);

    translating(dict);

    toggleLangTag(lang);
}

//configure language

function get_language() {
    //gets language from browser settings
    if(localStorage.getItem("lang")!=null){
        return localStorage.getItem("lang");
    }
    let nav_lang = navigator.language;
    if (nav_lang != undefined){
        return nav_lang.slice(0,2);
    }
    return 'en';
}
    


function choose_language(){
    //takes the input of the select element and returns it
    return document.querySelector("select").value;
}


//fetch dictionary
async function read_dictionary(lang){
    if (lang==null){
        lang = choose_language();
    }

    if(lang in cache){
        return cache[lang];
    }

        
    const response = await fetch(`locales/${lang}.json`);

     if(!response.ok){
        return {};
    }

    const translation = await response.json();

    cache[lang] = translation;

    return translation;
 
}



//translating
function translating(dict){

    let elements = document.querySelectorAll("[data-i18n]");

    for(const element of elements){
        var key = element.dataset.i18n;
        var text = dict[key];  
        
        element.textContent = text;
    }
}

function toggleLangTag(lang) {
    //change the language tag of index.html
  if (document.documentElement.lang !== lang) {
    document.documentElement.lang = lang;
  }
}
