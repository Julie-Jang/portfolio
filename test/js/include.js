//html include 하기 위한 js. 개발서버에는 필요 없음!!

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("include-html");
            includeHTML();
        }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
    }
    }
};


if (this.readyState == 4) {
    if (this.status == 200) {
        elmnt.innerHTML = this.responseText;
        var scripts = elmnt.getElementsByTagName("script");
        for (var j = 0; j < scripts.length; j++) {
            var newScript = document.createElement("script");
            newScript.text = scripts[j].text;
            document.head.appendChild(newScript); // 스크립트를 실행시키기 위해 head에 추가
        }
    }
    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
    elmnt.removeAttribute("include-html");
    includeHTML();
}
