function loadItems(searchterm = "") {
    var output = "";
    $.getJSON("items.json", (data) => {
        $.each( data, (group, items) => {
            let tempout = "";
            let itemlength = 0;
            tempout +=`<div class="group">\n<div class="title">${group}</div>\n`;
            $.each(items, (index, value) => {
                value = value.replace(/-/g, ' ');
                if (value.toLowerCase().includes(searchterm.toLowerCase())) {
                    tempout += `<a class="item" href="#${value.replace(/ /g, '-')}">${value.replace(new RegExp(searchterm.toLowerCase(), 'ig'), '<strong>$&</strong>')}</a>\n`;
                    
                    itemlength++;
                }
            });
            tempout += `</div>\n`;
            if (itemlength > 0)
                output += tempout;
        });
        if (output !== "")
            $("#sidebar .items").html(output);
        else 
            $("#sidebar .items").html("No items found");
    });
}

function search(elem) {
    loadItems(elem.value)
}

function look() {
    var scrollto = getParameterByName('scrollTo');
    if (!scrollto)
        return;
    
    var elem = document.getElementById(scrollto);
    var info = document.getElementById("content");
    
    var top = elem.offsetTop;
    info.scrollTop = top - 50;
    console.log(top);
}

function loadFile() {
    var element = document.getElementById("information");
    var url = window.location.hash, 
        idx = url.indexOf("#");
    hash = idx != -1 ? url.substring(idx+1, url.indexOf("?") !== -1 ? url.indexOf("?") : undefined) : "";
    if (hash === "")
        hash = "Welcome";
    
    hash = hash.replace(/-/g, ' ');
    
    $.get("files/" + hash + ".md", null, (data) => {
        var converter = new showdown.Converter();
        converter.setFlavor('github');
        var html = converter.makeHtml(data);
        
        element.innerHTML = html;
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
        $(':not(pre) code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
        look();
    }, 'text');
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}