

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"




const appSettings = {
    databaseURL: "https://realtime-database-bbb3e-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)



const usernameFieldEl = document.getElementById("username-field")










const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const usernameSubmit = document.getElementById("add__user")
const inputContainerEl = document.getElementById("input__cont")
const headerEl = document.getElementById("header__top")

let usernameValue = usernameFieldEl.value
usernameSubmit.addEventListener("click", function(){

    inputFieldEl.style.display = "inline";
    addButtonEl.style.display = "inline";
    shoppingListEl.style.opacity = "1";

    usernameFieldEl.style.display = "none"
    usernameSubmit.style.display = "none"
    headerEl.style.display = "block"
 


    let usernameValue = usernameFieldEl.value


 let shoppingListInDB = ref(database, `${usernameValue}/shoppinglist`)
    headerEl.innerHTML = `Lets Go Shopping:<br>
    
    ${usernameValue}
    ` 
 
 addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = `<li> No items here... yet </li>`
        shoppingListEl.innerHTML += `<li> double click to remove items </li>`
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `${usernameValue}/shoppinglist/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}

}) 

