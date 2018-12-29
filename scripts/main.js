// Get the date
const now = new Date();
$('#date').html(now.toDateString());

// Check if verse has been updated the same day
const verse = localStorage.getItem('bible_verse');
const timestamp = localStorage.getItem('timestamp');
var dateSaved = new Date(Date.parse(timestamp));
var isSameDay = (dateSaved.getDate() == now.getDate()) &&
                (dateSaved.getMonth() == now.getMonth()) &&
                (dateSaved.getFullYear() == now.getFullYear());
if (verse && isSameDay) {
    document.getElementById('verse').innerHTML = verse;
}

// Get the comic
const url = "https://www.comicsrss.com/preview/calvinandhobbes";
const obj = localStorage.getItem('calvinandhobbes_url');
if (obj) {
    $('#comic').attr('src', obj); //set comic if previously saved
}

$.ajax({
    url: url,
    method: 'GET',
    crossDomain: true
}).then((responseData) => {
    var url_start = responseData.indexOf("preview-comic", 0) + "preview-comic\" src=\"".length;
    var url_end = responseData.indexOf("\">",url_start);
    var comicSrc = responseData.substring(url_start, url_end);
    localStorage.setItem('calvinandhobbes_url', comicSrc);
    $('#comic').attr('src', comicSrc);}).fail((err) => {
  console.log(err);
});

// Randomly set background image
let imgURL =       ['night.png',
                    'rocks.jpg',
                    'snow.png',
                    'tree.png',
                    'wagon.jpg',
                    'hug.png',
                    'faces.png'];
let imgPosition =  ['center bottom',
                    'center bottom',
                    'center bottom',
                    'center center',
                    'left bottom',
                    'right bottom',
                    'right bottom'];
let index = Math.floor(Math.random() * imgURL.length);
setBackground();

// Change background image to the next image
function changeBackgroundOnce() {
  let i = 'url(images/' + imgURL[index] + ')  no-repeat '
                         + imgPosition[index] + ' fixed';
  $('#main').css({
    'background': i,
    'background-size': 'cover'
  });
  index = (index + 1) % imgURL.length;
}

// Change the background image every 30 seconds
function setBackground() {
  changeBackgroundOnce();
  setTimeout(setBackground, 30 * 1000);
}

// Set bible verse
function setVerse() {
  txt = document.getElementById('verse_input').value;
  document.getElementById('verse').innerHTML = txt;
  localStorage.setItem('bible_verse', txt);
  localStorage.setItem('timestamp', now);
}

// Change background on click
document.addEventListener("click", changeBackgroundOnce);
