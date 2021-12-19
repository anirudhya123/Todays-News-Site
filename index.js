// let btn = document.querySelector( '.btn' );
// console.log( btn );
// btn.addEventListener( 'click', speak );
// 
// https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=b66bb8b96877430597189680e574bf65
function speak ( string ) {
    // let xd = window.speechSynthesis;
    // let voices = xd.getVoices();
    // console.log(voices);
    let msg = new SpeechSynthesisUtterance();
    msg.pitch = 0;
    msg.rate = 1;
    msg.volume = 1;
    msg.lang = 'en-IN';
    msg.text = ( string );
    // msg.text = "I can read your text."
    window.speechSynthesis.speak( msg );
   
}
function display_DOM ( country, category ) {
    const xhr = new XMLHttpRequest;
    xhr.open( 'GET', `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b66bb8b96877430597189680e574bf65`, true );
    xhr.onload = function () {
        let html = "";
        // console.log( JSON.parse( this.responseText ).articles );
        JSON.parse( this.responseText ).articles.forEach( function ( element, index ) {
            // console.log( element.description);
            html += `<div class="accordion-item">
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                            ${element.title.slice( 0, 26 )}....  <span class="badge bg-danger mx-1">  ${element.source.name}</span>
                        </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.description}</p>
                            <button id="${element.title + element.description}" class="btn btn-primary" onclick="speak(this.id)">Read it.</button>
                            <a href="${element.url}" target="_blank" class="btn btn-danger float-end">Go page.</a>
                        </div>
                    </div>
                </div>`
        } );
        document.getElementById( "accordionExample" ).innerHTML = html;
    }
    xhr.send();
}

display_DOM( 'in', 'general' )
let apply_btn = document.getElementById( 'apply' );
apply_btn.addEventListener( 'click', apply_function );
function apply_function () {
    let country = document.getElementById( 'select_country' );
    let type = document.getElementById( 'select_type' );
    display_DOM( country.value, type.value );
    // console.log( country.value, type.value );
}