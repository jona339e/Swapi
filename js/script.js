import { filterIgnore, detailsIgnore } from "./Modules/filter.js";

const swapiApp = (async function () {
  const SWAPIURL = "https://swapi.dev/api";
  const navBar = document.querySelector("#nav-bar");
  const cardContainer = document.querySelector(".card-container");
  const cardcontainerdetails = document.querySelector(".card-container-details");

  const btnContainer = document.querySelector(".btn-container");

  try {
    const response = await fetch(SWAPIURL);
    const jsonData = await response.json();
    createNavItems(jsonData);
    document.querySelectorAll(".nav-item")[2].click();
  } catch (error) {
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

  async function btnClick(e) {
    deleteElements();
    let data = await getData(this.href);
    createButtons(data);
    showData(data);
  }

  function createButtons(data) {
    if (data.previous != null) {
      let btnPrev = document.createElement("button");
      btnPrev.classList.add("btn-nav");
      btnPrev.innerText = "Prev";
      btnPrev.addEventListener("click", btnClick);
      btnPrev.href = data.previous;
      btnContainer.appendChild(btnPrev);
    }
    if (data.next != null) {
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
    deleteElements();

    document.querySelector(".active")?.classList.remove("active");
    this.classList.add("active");
    let data = await getData(this.href);
    createButtons(data);

    showData(data);
  }

  async function cardDetails(e) {
    deleteElements();
    let data = await getData(this.href);
    console.log(data);
    // make a card and show the data
    let card = document.createElement("div");
    card.className = "single-card";

    singleCardShow();
    cardcontainerdetails.appendChild(card);

      function singleCardShow() {
          for (let [k, v] of Object.entries(data)) {
              if (v == null) {
                  card.insertAdjacentHTML("beforeend", `<span class="key">${k.replaceAll("_", " ")}:</span> <span class="val">N/A</span><br><hr>`);
                  continue;
              }

              if (detailsIgnore.includes(k)) continue;

              if (Array.isArray(v)) {

                  ifCardIsArray(k, v);

              } 
              
              else {
                  card.insertAdjacentHTML(
                      "beforeend", `<span class="key">${k.replaceAll("_", " ")}:</span> <span class="val">${v}</span><br><hr>`);
              }

          }

          function ifCardIsArray(k, v) {
              card.insertAdjacentHTML("beforeend", `<ul class="val">${k}</ul><br>`);
              for (let i = 0; i < v.length; i++) {
                  card.insertAdjacentHTML(
                      "beforeend",
                      `<li class="list-value">${v[i]}</li>`
                  );
              }
              card.insertAdjacentHTML("beforeend", `<br><span class="key">Number of ${k} ${v.length}</span><hr><br>`);
          }
      }
  }

  function showData(data) {
    data.results.forEach((dataItem) => {
      let card = document.createElement("div");
      card.className = "card";
      card.href = dataItem.url;
      card.addEventListener("click", cardDetails);
      for (let [k, v] of Object.entries(dataItem)) {
        if (!filterIgnore.includes(k))
          card.insertAdjacentHTML(
            "beforeend",
            `<span class="key">${k.replaceAll(
              "_",
              " "
            )}:</span> <span class="val">${v}</span><br><hr>`
          );
      }
      cardContainer.appendChild(card);
    });
  }

  async function getData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  function deleteElements() {
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
    while (btnContainer.firstChild) {
      btnContainer.removeChild(btnContainer.firstChild);
    }
    while (cardcontainerdetails.firstChild) {
      cardcontainerdetails.removeChild(cardcontainerdetails.firstChild);
    }
  }
})();
