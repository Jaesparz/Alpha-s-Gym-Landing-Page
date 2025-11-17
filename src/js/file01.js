'use strict';

import { fetchProducts, fetchCategories } from "./functions";
import { getContact, saveContact } from "./firebase";

let linkproducts = "https://jaesparz.github.io/my_gymProducts_json/products.json";
let linkcategories = "https://jaesparz.github.io/my_gymProducts_json/categories.xml";

let renderProducts = async () => {

    try {

        let result = await fetchProducts(linkproducts);

        if (result.success) {

            let container = document.getElementById("products-container");
            container.innerHTML = "";

            let products = result.body.slice(0, 6);

            products.forEach(product => {


                let productHTML = `
   <div class="space-y-4 bg-black dark:bg-gray-800 p-4 rounded-2xl shadow">
       <img
           class="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
           src="[PRODUCT.IMGURL]" alt="[PRODUCT.TITLE]">
       <h3
           class="h-6 text-xl font-semibold tracking-tight text-black-900 dark:text-white hover:text-black-600 dark:hover:text-white-400">
           $[PRODUCT.PRICE]
       </h3>

       <div class="h-5 rounded w-full">[PRODUCT.TITLE]</div>
           <div class="space-y-2">
               <a href="[PRODUCT.PRODUCTURL]" target="_blank" rel="noopener noreferrer"
               class="text-white bg-red-700 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block">
                   Ver en Amazon
               </a>
               <div class="hidden"><span class="1">[PRODUCT.CATEGORY_ID]</span></div>
           </div>
       </div>
   </div>`;

                productHTML = productHTML.replaceAll("[PRODUCT.TITLE]", product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title);

                productHTML = productHTML.replaceAll('[PRODUCT.CATEGORY_ID]', product.category_id);

                productHTML = productHTML.replaceAll('[PRODUCT.PRICE]', product.price);

                productHTML = productHTML.replaceAll('[PRODUCT.IMGURL]', product.imgUrl);


                container.innerHTML += productHTML;

            });
        }
    }
    catch (error) {
        return {
            success: false,
            body: error.message
        };

    };
}


let renderCategories = async () => {

    try {

        let response = await fetchCategories(linkcategories);

        if (response.success) {

            let container = document.getElementById("categories");

            container.innerHTML = "<option selected disabled class= bg-black > Seleccione una categoría </option>";

            let categoriesXML = response.body;

            let categories = categoriesXML.getElementsByTagName("category");

            for (let category of categories) {

                let id = category.getElementsByTagName("id")[0].textContent;
                let name = category.getElementsByTagName("name")[0].textContent;

                let XMLplan = ` <option value="[ID]" class= bg-black hover:bg-black > [NAME] </option>`;

                XMLplan = XMLplan.replaceAll("[ID]", id);
                XMLplan = XMLplan.replaceAll("[NAME]", name);

                container.innerHTML += XMLplan;
            }


        }
    }
    catch (error) {
        console.log("NO VALE");


    }
}

let enableFormContact = () => {

    const form = document.getElementById("getContacto");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let nombre = document.getElementById("nombre").value;
            let email = document.getElementById("email").value;
            let mensaje = document.getElementById("mensaje").value;


            saveContact(nombre, email, mensaje).then(response => {
                if (response.status) {
                    alert("Contacto Enviado! Te contactaremos Rápido :D");
                    
                }
                else {
                    alert("No se pudo enviar el contacto");
                }
            });
        });
    }

}

let DisplayNumberContacts = async () => {
    let container = document.getElementById("numberContacts");

    const { status, data, message } = await getContact();
    if (!status) {
        container.innerHTML = "sin datos xd";
    }

    const count = Object.keys(data).length;


   let contadorHTML = `
    <p class="text-white font-bold text-center lg:text-left lg:text-sm"> 
[CONTADOR] personas ya han enviado su contacto, aprovecha esta promoción 
        de 2 días gratis!!!! :DD 
    </p>
`;

    contadorHTML = contadorHTML.replaceAll("[CONTADOR]", count);

    container.innerHTML += contadorHTML;
}






(() => {
    alert("Bienvenido a la Landing Page de Alpha Gym");

})();



let mostrarCbum = () => {
    let verif = document.getElementById("btn-video");
    if (verif) {
        verif.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=hkaHHE0AbXo", "blank_");
        });
    }
}

let menuResponsivo= () => {
const toggleButton = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');


toggleButton.addEventListener('click', () => {
 
  mobileMenu.classList.toggle('hidden');
  const isHidden = mobileMenu.classList.contains('hidden');
  toggleButton.setAttribute('aria-label', isHidden ? 'Abrir menú' : 'Cerrar menú');
});

}


(() => {

    mostrarCbum();
    renderProducts();
    renderCategories();
    enableFormContact();
    DisplayNumberContacts();
    menuResponsivo();

})();



