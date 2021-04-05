fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=d1ef24d34d5f472098bdc813ef0137b3').then(function (res) {
    return res.json();
}).then(function (data) {
    return console.log(data);
});