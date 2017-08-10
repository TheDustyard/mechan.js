function loadItems(searchterm = "") {
    var output = "";
    $.getJSON("items.json", (data) => {
        $.each( data, (group, items) => {
            let tempout = "";
            let itemlength = 0;
            tempout +=`<div class="group">\n<div class="title">${group}</div>\n`;
            $.each(items, (index, value) => {
                if (value.toLowerCase().includes(searchterm.toLowerCase())) {
                    tempout += `<a class="item" href="#${value}" onclick="loadFile('${value}')">${value.replace(new RegExp(searchterm.toLowerCase(), 'ig'), '<strong>$&</strong>')}</a>\n`;
                    
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

function loadFile(file) {
    var element = document.getElementById("information");
    var url = window.location.hash, 
        idx = url.indexOf("#");
    var hash = file;
    if (hash === undefined)
        hash = idx != -1 ? url.substring(idx+1) : "";
    
    $.get("infos/" + hash + ".md", null, (data) => {
        var converter = new showdown.Converter();
        converter.setOption('tables', 'true');
        var html = converter.makeHtml(data);
        element.innerHTML = html;
    }, 'text');
}