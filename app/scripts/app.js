document.getElementById("font-text-ex-box").addEventListener("keyup", (e) => {
    const fontTextElements = document.getElementsByClassName("font-text");
    const fontText = e.target.value ? e.target.value : "Hello World!"
    for (let i = 0; i < fontTextElements.length; i++) {
        fontTextElements[i].innerText = fontText;
    }
});