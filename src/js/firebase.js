"use strict"

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const dataBaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

console.log("Project ID cargado:", dataBaseConfig.projectId);

const app = initializeApp(dataBaseConfig);
const dataBase = getDatabase(app);


let saveContact = (nombre,email,mensaje) => {

    let refContact = ref(dataBase, "Contact");
    let newContactRef = push(refContact);

    return set(newContactRef , {
        nombre : nombre,
        email : email,
        mensaje : mensaje,
        timeStamp : Date.now()

    }).then(() => {
        return {
            status : true,
            message : "se guardo el contacto correctamente"
        };
    }).catch((error) =>  {
        return{
            status : false,

            message : "no se pudo guardar el contacto"
        };
    });

}

let getContact = async () => {

    try{
    const contactRef = ref(dataBase, "Contact");
    const snap = await get(contactRef);

    if(snap.exists()){
        return {
            status: true,
            data: snap.val()
        };
    }
}
catch (error) {
    return {
        status: false,
        message: "Error al obtener el contacto"
    };
}
}


export{saveContact, getContact}

