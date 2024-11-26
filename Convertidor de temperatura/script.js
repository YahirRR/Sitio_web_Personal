var emoji = document.querySelector("#icon");
var par = document.querySelector("#par");

let temprature = () => {
    let opt = document.querySelector("#unit");
    let display = document.querySelector(".value");
    var a = parseFloat(document.querySelector(".takval").value);

    if (isNaN(a)) {
        display.innerHTML = "Please enter a valid number!";
        return;
    }

    // Conversión basada en la unidad seleccionada
    if (opt.value == "Celsius") {
        let F = a * (9 / 5) + 32;
        display.innerHTML = `${F.toFixed(4)} F`;
        updateEmoji(F);
    } else if (opt.value == "Fahrenheit") {
        let C = (a - 32) * (5 / 9);
        display.innerHTML = `${C.toFixed(4)} ºC`;
        updateEmoji(a);  // Usamos el valor de Fahrenheit directamente para los emojis
    } else if (opt.value == "Kelvin") {
        let C = a - 273.15;
        display.innerHTML = `${C.toFixed(4)} ºC`;
        updateEmoji((a - 273.15) * (9 / 5) + 32);  // Convertimos Kelvin a Fahrenheit para los emojis
    } else if (opt.value == "Rankine") {
        let C = (a - 491.67) * (5 / 9);
        display.innerHTML = `${C.toFixed(4)} ºC`;
        updateEmoji(a - 459.67);  // Convertimos Rankine a Fahrenheit para los emojis
    }
}

let updateEmoji = (F) => {
    if (F < 32) {
        emoji.style = "color:blue";
        emoji.className = "fa-solid fa-face-grimace";
        par.innerHTML = "Cool at freezing point";
    } else if (F > 122) {
        emoji.style = "color:red";
        emoji.className = "fa-solid fa-face-dizzy";
        par.innerHTML = "So Warm";
    } else {
        emoji.className = "fa-solid fa-face-grin";
        par.innerHTML = "";
        emoji.style = "color:rgb(253, 174, 37)";
    }
}
