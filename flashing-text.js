function flashText() {
  const elements = document.querySelectorAll("*");
  elements.forEach(element => {
    element.classList.add("flashing-text");
    setTimeout(() => {
      element.classList.remove("flashing-text");
    }, 1500);
  });
}

setInterval(flashText, 3000);
