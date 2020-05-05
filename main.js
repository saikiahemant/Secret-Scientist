const mapping = {
"A":0,
"B":1,
"C":2,
"D":3,
"E":4
};

function encrypt(input, key){
    debugger;
    stage_list = preProcess(input, key);

    maximum = 0;
    result_list = new Array(stage_list.length);
    requiredNN = new Map();

    for(let i = 0; i < stage_list.length; i++){
        requiredNN.set(stage_list[i], 0);
        if (maximum < stage_list[i] ) {
            maximum = stage_list[i];
        }
    }
    requiredNN = findNarcissisticNo(requiredNN,maximum);
   
    result_list = setNN(stage_list, requiredNN);
    //append the list
    let result_number = "";
    for(let i =0; i < result_list.length; i+=1){ 
        result_number += result_list[i].toString();
    }
    
    //carve out letters from it
    final_list = getValidNumbers(result_number);

    //get letters from final list
    encrypted_string = getEncryptedString(final_list);
    console.log(encrypted_string);

}

function preProcess(input, key) {
    let stage_list = [];
    debugger;
    for (const c of input) {
        let a = c.toLowerCase().charCodeAt();
        
        console.log(typeof(parseInt(a-97)+parseInt(key)));
        stage_list.push(parseInt(a-97)+parseInt(key));
    }
    // console.log("stagelist")
    // console.table(Object.entries(stage_list))

    return stage_list;
}

function findNarcissisticNo(requiredNN, maximum) {
    let counter = 1;
    for(let i = 1; i <= maximum; i++){0 
        if(checkIfNN(i)){
            if(requiredNN.has(counter)){
                requiredNN.set(counter, i);
            }
            counter++;
        }
    }
    // console.log("requiredNN")
    // console.table(requiredNN);

    return requiredNN;
}

function checkIfNN(number){
    let power = 0;
    let digits = [];
    let number_of_digits = 0;

    while(number != 0){
        digit = number % 10;
        number = number/10 >> 0;
        digits.push(digit);
        number_of_digits += 1;
    }
       
    let accumulator = 0;
    digits.reduce(function(accumulator, currentValue, currentIndex, array) {
        return accumulator + (currentValue ** number_of_digits);
      })

    // console.table(accumulator);
    return accumulator == number;
}

function setNN(stage_list, requiredNN){
    let result_list = [];
    for(let i=0; i< stage_list.length; i+=1){
        result_list.push(requiredNN.get(stage_list[i]));
    }

    // console.log("result list");
    // console.table(result_list);

    return result_list;
}

function getValidNumbers(result_number){
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
}

function getEncryptedString(final_list){
    let encrypted_string = ""
     for(i=0; i<final_list.length; i+=1)
     {  
        ascii = parseInt(65) + parseInt(final_list[i])
        encrypted_string += String.fromCharCode(ascii);
     }
     return encrypted_string;
}

encrypt("ABCABBC", 1);