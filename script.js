const BASE_URL="https://api.frankfurter.app/latest?from=USD&to=INR";
let countries = countryList
let selectFrom = document.querySelector("#from");
let selectTo = document.querySelector("#to");
let imgFrom = document.querySelector("#imgFrom");
let imgTo = document.querySelector("#imgTo");
let form = document.querySelector("form");
let input = document.querySelector("input");
let message= document.querySelector(".msg");

let currencyFrom="USD";
let currencyTo="INR";

let setImageFrom= async (country)=>{
    console.log(country);
     imgFrom.setAttribute("src",`https://flagsapi.com/${country}/flat/64.png`);
}
let setImageTo= async (country)=>{
     imgTo.setAttribute("src",`https://flagsapi.com/${country}/flat/64.png`);
}

let calculateCurrency=async()=>{
   if(currencyFrom===currencyTo) {
       alert("Both currencies are same");
       return;
   }
   let getInputBoxValue = input.value.trim(); // fetching the inputbox value
   if (isNaN(getInputBoxValue) || Number(getInputBoxValue) <= 0) {
       alert("Invalid Input! Please enter a positive number only");
       return;
   }
   let response = await fetch(`https://api.frankfurter.app/latest?from=${currencyFrom}&to=${currencyTo}`);
   let data = await response.json();
   let calculatedCurrency = data.rates[currencyTo] * Number(getInputBoxValue);
   let setCurrency = `${getInputBoxValue} ${currencyFrom} = ${calculatedCurrency} ${currencyTo}`;
   message.innerHTML = setCurrency;
}

for (country in countries) {
    if (country === 'USD') {
        selectFrom.innerHTML += `<option selected>${country}</option>`
    }
    if (country === 'INR') {
        selectTo.innerHTML += `<option selected>${country}</option>`
    }
    selectFrom.innerHTML += `<option>${country}</option>`
    selectTo.innerHTML += `<option>${country}</option>`
    //console.log(`${country} ${countries[country]} `)
}

selectFrom.addEventListener("change",(event)=>{
        currencyFrom= event.target.value;
        console.log(currencyFrom);
       setImageFrom(countries[currencyFrom]);
       
})

selectTo.addEventListener("change",(event)=>{
        currencyTo= event.target.value;
       setImageTo(countries[currencyTo]);
       
})

form.addEventListener("submit",(event)=>{
    event.preventDefault();

    calculateCurrency();
})

