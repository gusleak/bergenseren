fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=d1ef24d34d5f472098bdc813ef0137b3')
    .then(res => res.json())
    .then(data => console.log(data))