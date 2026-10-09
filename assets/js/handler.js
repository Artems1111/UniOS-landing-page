'use strict'

//-----------------------------------------------------Translating Script (i18n)-----------------------------------------------------------

// cache
const cache = {};


//orchestrator function
export async function init_i18n(){
    let lang = get_language();

    change_lang();
    
    await apply_language(lang);
}

async function apply_language(lang) {
    let dict = await read_dictionary(lang);

    if(dict!={}){
        translating(dict);

        toggleLangTag(lang);
    }
  
}

function change_lang(){
    let lang_btn = document.getElementById("change_lang");
    lang_btn.addEventListener("click", 
        async function change(){
            let lang;
            if (lang_btn.textContent == "Ελληνικά"){
                lang = 'en';
            }
            else{
                lang='el';
            }
            
           
            localStorage.setItem("lang", lang);
            await apply_language(lang);
    }
    )
}

//configure language

function get_language() {
    //gets language from local storage
    if(localStorage.getItem("lang")!=null){
        let st_lang = localStorage.getItem("lang");
        if(valid_language(st_lang)){
            //document.querySelector("select").value = st_lang;
            return st_lang;
        } 
    }
    //gets language from browser settings
    let nav_lang = navigator.language;
    if (nav_lang != undefined){
        nav_lang = nav_lang.slice(0,2);
        if (valid_language(nav_lang)){
            localStorage.setItem("lang", nav_lang)
            document.querySelector("select").value = nav_lang;
            return nav_lang;
        } 
    }
    document.querySelector("select").value = 'en';
    return 'en';
    
}

function valid_language(lang){
    let langs = new Set(['en', 'el'])
    return langs.has(lang);
    
}
    


//fetch dictionary
async function read_dictionary(lang){
     //if dict is cached
    if(lang in cache){
        return cache[lang];
    }

        
    const response = await fetch(`../locales/${lang}.json`);

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
        let key = element.dataset.i18n;
        let text = dict[key] ?? element.textContent;  
        
        element.textContent = text;
    }
}

function toggleLangTag(lang) {
    //change the language tag of index.html
  if (document.documentElement.lang !== lang) {
    document.documentElement.lang = lang;
  }
}
