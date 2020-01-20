const defaultExampleText = "WooHoo, This is so much fun!!";
const defaultFontSize = "24px";

const viewModes = {
    GRID: 'Grid',
    LIST: 'List'
};

let currentGridViewMode;

// Initialize UI
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