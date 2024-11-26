function calcularepFcn() {
    const presion = parseFloat(document.querySelector("#presion").value);
    const diametro = parseFloat(document.querySelector("#diametro").value);
    const longitud = parseFloat(document.querySelector("#Longitud").value);

    const material = parseFloat(document.querySelector('#Material').value);
    let UTS, Ys, rhoMaterial;

    switch (material) {
        case 1: UTS = 415; Ys = 230; rhoMaterial = 7800; break;
        case 2: UTS = 450; Ys = 275; rhoMaterial = 7800; break;
        case 3: UTS = 485; Ys = 275; rhoMaterial = 7800; break;
        case 4: UTS = 415; Ys = 220; rhoMaterial = 7860; break;
        case 5: UTS = 485; Ys = 260; rhoMaterial = 7850; break;
        default: UTS = 0; Ys = 0; rhoMaterial = 0; break;
    }

    const eficiencia = parseFloat(document.querySelector("#Eficiencia").value);
    let eta;

    switch (eficiencia) {
        case 1: eta = 1; break;
        case 2: eta = 0.85; break;
        case 3: eta = 0.75; break;
        default: eta = 1; break;
    }

    const rho = parseFloat(document.querySelector("#Densidad").value);

    const S = Math.min(UTS / 3.5, Ys * 2 / 3);

    let ttapas = (presion * diametro) / (2 * S * eta - 0.2 * presion);
    ttapas = ttapas / 0.0254;
    document.querySelector("#espesortapas").value = ttapas.toFixed(4); 

    let tcuerpo = (presion * (diametro / 2)) / (S * eta - 0.6 * presion);
    tcuerpo = tcuerpo / 0.0254;
    document.querySelector("#espesorcuerpo").value = tcuerpo.toFixed(4);

    const valoretc = parseFloat(document.querySelector('#espesorrealtapa').value);
    let espesortapareal = [1/8, 1/4, 1/3, 3/8, 1/2, 5/8, 3/4, 7/8, 1, 1 + 1/4, 1 + 3/8, 1 + 1/2, 1 + 5/8, 1 + 3/4, 2][valoretc - 1];

    const Vtapas = (Math.PI / 12) * (Math.pow(diametro + 2 * espesortapareal, 3) - Math.pow(diametro, 3));

    const valoretb = parseFloat(document.querySelector('#espesorrealcuerpo').value);
    let espesorcuerporeal = [1/8, 1/4, 1/3, 3/8, 1/2, 5/8, 3/4, 7/8, 1, 1 + 1/4, 1 + 3/8, 1 + 1/2, 1 + 5/8, 1 + 3/4, 2][valoretb - 1];

    const Vcuerpo = (Math.PI * longitud / 12) * (Math.pow(diametro + 2 * espesorcuerporeal, 2) - Math.pow(diametro, 2));

    const pesoequipo = (Vtapas + Vcuerpo) * rhoMaterial;
    document.querySelector('#pesoequipo').value = pesoequipo.toFixed(0);
    
    verificarEspesor(ttapas, espesortapareal, '#espesortapas');
    verificarEspesor(tcuerpo, espesorcuerporeal, '#espesorcuerpo');

    // Cálculo del peso del equipo lleno, modificacion de las observaciones echas en clase 11-16-2024
    const nivel = parseFloat(document.querySelector("#Nivel").value);
    const volumenLiquido = Math.PI * Math.pow(diametro / 2, 2) * nivel; // Volumen cilíndrico del líquido
    const pesoLiquido = volumenLiquido * rho; // Peso del líquido
    const pesoLleno = pesoequipo + pesoLiquido;

    // Mostrar el resultado en el campo correspondiente
    document.querySelector("#pesoequipolleno").value = pesoLleno.toFixed(0);
}

function verificarEspesor(calculo, real, selector) {
    const element = document.querySelector(selector);
    if (real < calculo) {
        element.style.backgroundColor = 'rgb(255,199,206)';
        element.style.color = 'rgb(156,0,6)';
    } else {
        element.style.backgroundColor = 'rgb(198,239,206)';
        element.style.color = 'rgb(0,97,0)';
    }
}
