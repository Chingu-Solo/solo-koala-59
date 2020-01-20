const defaultExampleText = "Then came the night of the first falling star";
const defaultFontSize = "24px";

const viewModes = {
    GRID: 'Grid',
    LIST: 'List'
};

const fontCollection = [
    {name: 'Gelasio', author: 'Eben Sorkin', fontFamily: `'Gelasio', serif`},
    {name: 'Bangers', author: 'Vernon Adams', fontFamily: `'Bangers', cursive`},
    {name: 'Ubuntu', author: 'Dalton Maag', fontFamily: `'Ubuntu', sans-serif`},
    {name: 'Open Sans Condensed', author: 'Steve Matteson', fontFamily: `'Open Sans Condensed', sans-serif`},
    {name: 'Roboto Slab', author: 'Christian Robertson', fontFamily: `'Roboto Slab', serif`},
    {name: 'Nunito', author: 'Vernon Adams', fontFamily: `'Nunito', sans-serif`},
    {name: 'Inconsolata', author: 'Raph Levein', fontFamily: `'Inconsolata', monospace`},
    {name: 'Indie Flower', author: 'Kimberly Geswein', fontFamily: `'Indie Flower', cursive`},
    {name: 'Dancing Script', author: 'Impallari Type', fontFamily: `'Dancing Script', cursive`},
    {name: 'Pacifico', author: 'Vernon Adams, Jacques Le Bailly, Botjo Nikoltchev, Ani Petrova', fontFamily: `'Pacifico', cursive`},
    {name: 'Shadows Into Light', author: 'Kimberly Geswein', fontFamily: `'Shadows Into Light', cursive`},
    {name: 'Amatic SC', author: 'Vernon Adams, Ben Nathan, Thomas Jockin, Cyreal', fontFamily: `'Amatic SC', cursive`},
];

let currentGridViewMode;

// Initialize UI
buildGrid();
resetFontTextInput();
resetFontSizeDropDown();
resetViewMode();

const textInputEventsHandler = (event) =>  {
    if (event.type === "keyup" || event.type === "change") {
        const fontText = event.target.value ? event.target.value : defaultExampleText
        updateFontText((element) => element.innerText = fontText);
    }
}

const searchInputEventsHandler = (event) => {

}

document.getElementById("font-text-ex-box").addEventListener("keyup", textInputEventsHandler);
document.getElementById("font-text-ex-box").addEventListener("change", textInputEventsHandler);

document.getElementById("font-search-box").addEventListener("keyup", searchInputEventsHandler);
document.getElementById("font-search-box").addEventListener("change", searchInputEventsHandler);

document.getElementById("font-size-dropdown").addEventListener("change", (event) => {
    updateFontText((element) => element.style.fontSize = event.target.value + "px");
});

document.querySelector("#night-mode-toggle > .bg-black").addEventListener("click", () => {
    setNightModeData(true /* isNightModeOn */);
});

document.querySelector("#night-mode-toggle > .bg-white").addEventListener("click", () => {
    setNightModeData(false /* isNightModeOn */);
});

document.getElementById("list-view-type").addEventListener("click", () => {
    const docElementStyles = document.documentElement.style;
    docElementStyles.setProperty("--grid-min-column-size", currentGridViewMode === viewModes.GRID ? "100%" : "300px");
    document.getElementById("list-view-type").innerText = currentGridViewMode; 
    currentGridViewMode = currentGridViewMode === viewModes.GRID ? viewModes.LIST : viewModes.GRID;
});

document.getElementById("reset-btn").addEventListener("click", () => {
    setNightModeData(false /* isNightModeOn */);
    resetFontSizeDropDown();
    resetFontTextInput();
    resetViewMode();
});

function resetFontSizeDropDown() {
    document.getElementById("font-size-dropdown").selectedIndex = "1";
    updateFontText((element) => element.style.fontSize = defaultFontSize);
}

function resetFontTextInput() {
    document.getElementById("font-text-ex-box").value = "";
    updateFontText((element) => element.innerText = defaultExampleText);
}

function resetViewMode() {
    const docElementStyles = document.documentElement.style;
    docElementStyles.setProperty("--grid-min-column-size", "300px");
    document.getElementById("list-view-type").innerText = viewModes.LIST; 
    currentGridViewMode = viewModes.GRID;
}

function setNightModeData(isNightModeOn) {
    const docElementStyles = document.documentElement.style;
    docElementStyles.setProperty("--text-color", isNightModeOn ? "white" : "black");
    docElementStyles.setProperty("--background-color", isNightModeOn ? "black" : "white");
}

function updateFontText(updateAction) {
    const fontTextElements = document.getElementsByClassName("font-text");
    for (let i = 0; i < fontTextElements.length; i++) {
        updateAction(fontTextElements[i]);
    }
}

function buildGrid() {
    const gridContainer = document.getElementById("grid-container");

    fontCollection.forEach(font => {
        const gridItemEle = document.createElement("div");
        gridItemEle.className = "grid-item";
        const fontNameEle = document.createElement("h3");
        fontNameEle.className = "font-name";
        fontNameEle.innerText = font.name;
        fontNameEle.style.fontFamily = font.fontFamily;
        const fontAuthorEle = document.createElement("p");
        fontAuthorEle.className = "font-author";
        fontAuthorEle.innerText = font.author;
        const fontTextEle = document.createElement("p");
        fontTextEle.className = "font-text";
        fontTextEle.style.fontFamily = font.fontFamily;

        gridItemEle.appendChild(fontNameEle);
        gridItemEle.appendChild(fontAuthorEle);
        gridItemEle.appendChild(fontTextEle);

        gridContainer.appendChild(gridItemEle);
    });
}