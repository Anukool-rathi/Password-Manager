function copy(){
    const copyText = document.querySelector(".copy_text");
    navigator.clipboard.writeText(copyText.value);
}