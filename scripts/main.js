// Get the date
const now = new Date();
$('#date').html(now.toDateString());

//Get the comic
const url = "http://www.gocomics.com/calvinandhobbes";
const obj = localStorage.getItem('calvinandhobbes_url');
if (obj) {
    $('#comic').attr('src', obj);
}

$.ajax({
    url: url,
    method: 'GET',
    crossDomain: true
}).then((responseData) => {
  html = $.parseHTML(responseData);
  $.each(html, (i, el) => {
      if (el.className === 'amu-container-global') {
          const comicSrc = el.getElementsByClassName("item-comic-image")[0].children[0].src
          if (!obj || comicSrc !== obj) {
              localStorage.setItem('calvinandhobbes_url', comicSrc);
              $('#comic').attr('src', comicSrc);
          }
      }
  });
}).fail((err) => {
  console(err);
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

//Change the background image every 30 seconds
function setBackground() {
  let i = 'url(../images/' + imgURL[index] + ')  no-repeat '
                         + imgPosition[index] + ' fixed';
  $('#main').css({
    'background': i,
    'background-size': 'cover'
  });
  index = (index + 1) % imgURL.length;
  setTimeout(setBackground, 30000);
}
