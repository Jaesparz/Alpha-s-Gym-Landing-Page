'use strict';

let fetchProducts = async(url) => {

    try{

    let response = await fetch(url);

    if(!response.ok){
        throw Error(response.error);
    }

    let data = await response.json();

    return {
        success: true,
        body: data
    };

    }
    catch (error){
        return {
            success: false,
            body: error.message
        };
    }
}

export{fetchProducts} 


