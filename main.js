let searchResults = document.querySelector('#searchResults');
let musicPlayer = document.querySelector('.musicPlayer')

let input = document.querySelector('input');
let submit = document.querySelector('button');
let output;

submit.addEventListener('click', function search() {

  searchResults.innerHTML = "";

  // User's search value is concatenated by + to be able to be put into the api search
  let userSearch = input.value;
  userSearch = userSearch.split(" ").join("+");

  fetch(`https://itunes.apple.com/search?term=${userSearch}`)
    .then(function(response) {
      console.log(response);
      response.json()

        .then(function(data) {
          console.log(data);
          output = data.results;
          console.log(output);
          console.log(output[0]);
        })

        .then(function() {
          for (let i = 0; i < output.length; i++) {
            // Generating album covers, song and artist names, making album the clickable play button for song preview
            searchResults.innerHTML += `
                <div class="result">
                  <button id='playSong${[i]}' class="playSong" title="Play Song"></button>
                  <style>#playSong${[i]} {background-image: url('${output[i].artworkUrl100}'); width: 100px; height: 100px;}</style>
                  <h6>${output[i].trackName}</h6>
                  <h5>${output[i].artistName}</h5>
                </div>
                `
          }
          // Event listener for play button to send clip to html audio
          let playSong = document.querySelectorAll('.playSong');
          for (let i = 0; i < output.length; i++) {
            playSong[i].addEventListener('click', function() {
              musicPlayer.innerHTML = `
                  <p>Now playing:  ${output[i].trackName} - ${output[i].artistName}</p>
                  <audio src="${output[i].previewUrl}" autoplay controls></audio>
                `
            })
          }
        })
    })
})
