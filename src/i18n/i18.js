import React from "react";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import english  from "./english.json";
import  arabic  from "./arabic.json";
import hindi from "./hindi.json"
import i18n from "i18next"
import Backend from 'i18next-http-backend';
import { useSelector } from "react-redux";


const resources = {
    en : {
        translation : english
    } ,
    ar : {
        translation : arabic
    },
    hn : {
        translation : hindi
    }
  
}

const ChoosedLanguage = () =>{
    const alreadyChoosedLanguage = useSelector((state) => state.languageHanlder.language);
    return alreadyChoosedLanguage ;
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources ,
        lng: 'en' ,
        keySeparator : false,
        interpolation : {
            escapeValue : false
        }
    });

export default i18n ;