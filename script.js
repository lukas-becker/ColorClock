function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

function getCurrentTime() {
    var date = new Date();
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);


    return date.toISOString().substring(11, 19);
}

function stringToHex(str) {
    
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        hex += '' + str.charAt(i).toString(16);
    }
    return hex;

}

function stringToColor(str){
    var arr = str.split(":");
    for(var i = 0; i < arr.length; i++){
        arr[i] = stringToHex(arr[i]);
    }

    var color = "#" + arr[0] + arr[1] + arr[2];

    return color
}

function determineFontColor(time){
    var arr = time.split(":");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i], 16);
    }

    var hsp = Math.sqrt(
        0.299 * (arr[0] * arr[0]) +
        0.587 * (arr[1] * arr[1]) +
        0.114 * (arr[2] * arr[2])
      );

    if (hsp > 127.5) {
        return "#000000";
    } else {
        return "#ffffff";
    }
}

function updateTimeSpan(time){
    var fontColor = determineFontColor(time)
    document.body.style.color = fontColor;  

    time = time.replace(/:/g, "");

    time = "#" + time;
    var span = document.getElementById("time");
    span.innerHTML = time;
}

function update()
{
    var time = getCurrentTime();
    var color = stringToColor(time);
    changeBackgroundColor(color);
    updateTimeSpan(time);
}


update();
setInterval(update, 1000);
