fetch('https://newsapi.org/v2/everything?q=bergen&apiKey=APIKEY')
    .then(res => res.json())
    .then(data => console.log(data))