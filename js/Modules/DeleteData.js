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

  export {deleteElements};