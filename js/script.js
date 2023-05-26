import { filterIgnore } from "./Modules/filter.js";



const swapiApp = (async function () {

    const SWAPIURL = "https://swapi.dev/api"
    const navBar = document.querySelector("#nav-bar");
    const cardContainer = document.querySelector(".card-container");
    const btnContainer = document.querySelector(".btn-container");
    

    try {
        const response = await fetch(SWAPIURL);
        const jsonData = await response.json();
        createNavItems(jsonData);
        document.querySelectorAll(".nav-item")[2].click();

    }
    catch (error) {
        console.log(error);
    }


    function createNavItems(jsonData) {
        for (let key in jsonData) {
            let navItem = document.createElement("a");
            navItem.addEventListener("click", navClick);
            navItem.className = "nav-item";
            navItem.innerText = key;
            navItem.href = jsonData[key];
            navBar.appendChild(navItem);
        }
    }

    async function btnClick(e){
        deleteElements()
        let data = await getData(this.href);
        createButtons(data);
        showData(data);
    }

    function createButtons(data) {
            if(data.previous != null){
                let btnPrev = document.createElement("button");
                btnPrev.classList.add("btn-nav");
                btnPrev.innerText = "Prev";
                btnPrev.addEventListener("click", btnClick);
                btnPrev.href = data.previous;
                btnContainer.appendChild(btnPrev);
            }
            if(data.next != null){
                let btnNext = document.createElement("button");
                btnNext.classList.add("btn-nav");
                btnNext.innerText = "Next";
                btnNext.addEventListener("click", btnClick);
                btnNext.href = data.next;
                btnContainer.appendChild(btnNext);

            }
    }

    async function navClick(e) {
        e.preventDefault();
        deleteElements()

        document.querySelector(".active")?.classList.remove("active");
        this.classList.add("active");
        let data = await getData(this.href);
        createButtons(data);

        showData(data);

        
    }

    function showData(data) {
        data.results.forEach(dataItem => {
            let card = document.createElement("div");
            card.className = "card";
            for (let [k, v] of Object.entries(dataItem)) {
                if (!filterIgnore.includes(k))
                    card.insertAdjacentHTML("beforeend", `<span class="key">${k.replaceAll("_", " ")}:</span> <span class="val">${v}</span><br><hr>`);
            }
            cardContainer.appendChild(card);
        });
    }

    async function getData(url) {
        const response = await fetch(url);
        return await response.json();
    }


    function deleteElements(){
        while(cardContainer.firstChild){
            cardContainer.removeChild(cardContainer.firstChild);
        }
        while(btnContainer.firstChild){
            btnContainer.removeChild(btnContainer.firstChild);
        }
    }

})();

