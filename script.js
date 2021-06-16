let myObj = {
  url : "https://randomuser.me/api/?results=5"
}

let request = obj =>{
    return new Promise((resolve,reject)=>
    {
        let fruit = true

        let xhr = new XMLHttpRequest();

        obj = myObj;

        xhr.open( "GET" ,obj.url);

        xhr.onload = ()=>{
            if(xhr.status >=200 && xhr.status<300 && fruit){
                resolve(xhr.response);
            }else{
                reject(xhr.statusText);
            }
        }

        xhr.onerror = ()=>{
            reject(xhr.statusText);
        } 

        xhr.send();
    });
}

let build = function(data) {
    let users = JSON.parse(data);
    users.results.forEach(user => {
        console.log(user)
    });

    let html ="";
    users.results.forEach(user => {
       html+=`
        <div>
            <img src="${user.picture.medium}">
            <div>
                ${user.name.title} ${user.name.first} ${user.name.last}
            </div>
        </div>    
       `;
    })

    document.querySelector('#users').innerHTML = html;

    return Promise.resolve('Script is loaded')
}

request(myObj).then(build).then(message => console.log(message)).catch(function() {
    console.log('Hata 404');
})

