let intendedElement = document.getElementById('grid');
let text;
let cost;
document.addEventListener('click', function(e) {

    if(intendedElement.contains(e.target)){
        e = e || window.event;
        target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
        text = text.substring(text.length - 24, text.length);
        // alert(text);
        localStorage.setItem('Pid', text);
    }
    // console.log(list)
    // alert(list)
}, false);
