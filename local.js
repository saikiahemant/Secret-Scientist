{
    'use strict';

    const Data = {
    };

    const DOMStrings = {
        inputString: document.querySelector("#text"),
        key: document.querySelector("#key"),
        outputString: document.querySelector("#encryptedString"),
        btn: document.querySelector("#encryptButton"),
        output: document.querySelector("#encryptedString")
    };

    const ControlMethods = {
    encrypt: async (input, key) => {
        debugger;
       let promise = new Promise((resolve, reject) => {
            
        stage_list = ControlMethods.preProcess(input, key);
        // console.log("stagelist")
        // console.log(Object.entries(stage_list))

    
        maximum = 0;
        result_list = new Array(stage_list.length);
        requiredNN = new Map();

        for(let i = 0; i < stage_list.length; i++){
            requiredNN.set(stage_list[i], 0);
            if (maximum < stage_list[i] ) {
                maximum = stage_list[i];
            }
        }
        // console.log(maximum,"max")
        requiredNN = ControlMethods.findNarcissisticNo(requiredNN,maximum);
        // console.log("requiredNN")
        // console.log(requiredNN);
    
        result_list = ControlMethods.setNN(stage_list, requiredNN);
        
        //append the list
        let result_number = "";
        for(let i =0; i < result_list.length; i+=1){ 
            result_number += result_list[i].toString();
        }
        
        console.log("result list");
        console.log(result_list);
        //carve out letters from it
        final_list = ControlMethods.getValidNumbers(result_number);

        //get letters from final list
        encrypted_string = ControlMethods.getEncryptedString(final_list);
     
        resolve (encrypted_string);
    });
    let result = await promise;
   
    return result;
    },
    
    preProcess: (input, key) =>{
        let stage_list = [];

        for (const c of input) {
            let a = c.toLowerCase().charCodeAt();
            stage_list.push(parseInt(a-97)+parseInt(key));
        }
        return stage_list;
    },

    findNarcissisticNo: (requiredNN, maximum) =>{
        let counter = 1;

        for(let i = 1; counter <= maximum; i++){ 
            if(ControlMethods.checkIfNN(i)){
                if(requiredNN.has(counter)){
                    requiredNN.set(counter, i);
                    console.log("yes")
                }
                console.log(counter,i)
                counter++;
            }
        }
        
        return requiredNN;
    },

    checkIfNN: (number) =>{
        let number_of_digits = Math.ceil(Math.log10(number + 1));;
        let number1 = number; 
        let accumulator1=0;

        while(number != 0){
            digit = number % 10;
            number = number/10 >> 0;
            accumulator1 += (digit**number_of_digits);
            if (accumulator1 > number1)
            {return false;}
        }
        return accumulator1 == number1;
    },

    setNN: (stage_list, requiredNN) =>{
        let result_list = [];
        for(let i=0; i< stage_list.length; i+=1){
            result_list.push(requiredNN.get(stage_list[i]));
        }
      
        return result_list;
    },

    getValidNumbers:(result_number) => {
        let p = 0;
        final_list = []
        while(p < result_number.length){
             if(parseInt(result_number.substring(p,p+2)) < 26){
                 
                 final_list.push(result_number.substring(p,p+2));
                 p += 2;
             }
             else{
                
                final_list.push(parseInt(result_number.substring(p,p+1)));
                p += 1 ;
             }
         }
         return final_list;
    },

    getEncryptedString:(final_list) => {
        let encrypted_string = ""
         for(i=0; i<final_list.length; i+=1)
         {  
            ascii = parseInt(65) + parseInt(final_list[i])
            encrypted_string += String.fromCharCode(ascii);
         }
         return encrypted_string;
    },

    getFinalList:()=>{}
}

DOMStrings.btn.addEventListener('click', (e) => {
    let input = DOMStrings.inputString.value;
    let key = DOMStrings.key.value;
    console.log(input,key);

    ControlMethods.encrypt(input, key).then((ecncryptedText)=>{
        console.log(ecncryptedText);
        DOMStrings.output.value = ecncryptedText;
        DOMStrings.output.style.display = "block";
    }
    ).catch(er=>{
        console.log("Uh oh");
    });
    debugger;
    console.log("Oh yeah !!");
});

}