const btnInput = document.getElementById("btn-input");
const inputEl = document.querySelector("#input-el"); //NOTE: Hashtag used when accessing id using query selector.
const urlEl = document.querySelector("#urls-el");
const btnDelete = document.getElementById("btn-delete");
const btnTab = document.getElementById("btn-tab");

let urls = [];

//GET Saved URLS from Local Storage
const urlsFromStorage = JSON.parse(localStorage.getItem("urls")); //convert strings from local storage using JSON.parse.

//This method adds the input value to the urls array. 
const addUrl = () => {
    urls.push(inputEl.value);
}


const render = (_urls) => {
    //NOTE: .innerHTML allows to create html elements in javascript.
    //Now we render each element in a <li> tag.
    
    let listItems = "";
    for (let i = 0; i < _urls.length; i++) {

     /* listItems += "<li><a target='_blank' href='" + urls[i] + "'>" + urls[i] + "</a></li>";   
        Use a template literal to rewr ite the above code. Adds html into javascript.*/
     listItems +=     ` 
           <li>
               <a target='_blank' href = '${_urls[i]}' > ${_urls[i]} </a> 
           </li>
     `;          
    }

    urlEl.innerHTML = listItems;

}

if(urlsFromStorage){ //If local storage key value pairs are NOT NULL.  
    urls = urlsFromStorage; //Add local storage items to urls array. 
    render(urls);
}


//Button Click Method using event listener. IMPOROTANT!
btnTab.addEventListener("click" , ()=>{

    chrome.tabs.query({active:true, currentWindow:true} , (tabs) => { //using the chrome api. 
        urls.push(tabs[0].url); 

        //Push urls array to local storage. 
        localStorage.setItem("urls" , JSON.stringify(urls));
        render(urls);

    })


})


//Button Click Method using event listener. IMPOROTANT!
btnInput.addEventListener("click" , ()=>{
    console.log("clicked");
    addUrl(); 
    render(urls);

    inputEl.value = ""; //set input field value to null. 

    //Push urls to local storage
    localStorage.setItem("urls" , JSON.stringify(urls));
    console.log(localStorage.getItem("urls"));
    
})


//Button Click Method using event listener. IMPOROTANT!
btnDelete.addEventListener("dblclick" , ()=>{ //dblClick stands for double click. 

    localStorage.clear(); //clear local storage
    urls = []; //clear the array
    render(urls); //move empty array to local storage. 
})

