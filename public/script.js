// Initialize Firebase
var config = {
  apiKey: "AIzaSyBfAHRlmuP8bkagQqR_S7r3e7wAUydLt4E",
  authDomain: "dublinslider.firebaseapp.com",
  databaseURL: "https://dublinslider.firebaseio.com",
  projectId: "dublinslider",
  storageBucket: "dublinslider.appspot.com",
  messagingSenderId: "399862458831"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

var storage = firebase.storage();
var map;
var name;
var nameId;
var id = -1;
var lat;
var lng;
var prev = 'https://firebasestorage.googleapis.com/v0/b/dublinslider.appspot.com/o/belvedereschool%2Fbelvederehouse%20old.jpg?alt=media&token=3bece55b-41e6-4572-8319-a93c1afe4114';
var description;
var before;
var after;
var finalId;
var marker = [];
var currentInfoWindow = null;
var query = firebase.database().ref("photos");
var slider2 = [];
var handle2 = [];
var z2= [];

function createMarker(){
  query.orderByChild("id").once("value")
    .then(function(snapshot) {
      var i = 0;
      snapshot.forEach(function(childSnapshot) {
        name = childSnapshot.key;
        nameId = childSnapshot.val()['id'];
        lat = childSnapshot.val()['lat'];
        lng = childSnapshot.val()['lng'];
        prev = childSnapshot.val()['after'];

        if (lat != null || lng != null || prev != null){
          var myIcon = {
            url: prev, // url
            scaledSize: new google.maps.Size(64, 64), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          };
          var location = {lat: lat, lng: lng};
          marker[i] = new google.maps.Marker({id: i+1, position: location, map: map, icon: myIcon});

          var divisor = document.getElementById("divisor");
          var slider = document.getElementById("slider");
          var handle = document.getElementById("handle");

          var contentString = '<div id="container"><p id="id"></p><strong id="desc"></strong><div id="comparison"> '+
            '<figure id="myFigure">' +
              '<div id="handle"></div>' +
              '<div id="divisor"></div>' +
            '</figure>' +
            '<input type="range" min="0" max="100" value="50" id="slider" oninput="moveDivisor()">' +
          '</div></div>';
          var contentStringBar = '<div class="container2"><p id="id"></p><strong class="desc2"></strong><div class="comparison2"> '+
            '<figure class="myFigure2">' +
              '<div class="handle2"></div>' +
              '<div class="divisor2"></div>' +
            '</figure>' +
            '<input type="range" min="0" max="100" value="50" class="slider2" oninput="moveDivisor2('+i+')">' +
          '</div></div>';
          document.getElementById("content2").innerHTML += contentStringBar;

          slider2 = document.getElementsByClassName("slider2");
          handle2 = document.getElementsByClassName("handle2");
          z2 = document.getElementsByClassName("divisor2");

          var t2 = document.getElementsByClassName("myFigure2");
          var u2 = document.getElementsByClassName("container2");
          var y2 = document.getElementsByClassName('desc2');

          description = childSnapshot.val()['description'];
          before = childSnapshot.val()['before'];
          after = childSnapshot.val()['after'];

          var img3 = new Image();
          var img4 = new Image();
          img3.src = after;
          img4.src = before;

          t2[i].style.background = "url('"+after+"')";
          z2[i].style.background = "url('"+before+"')";
          if (img3.width >= img3.height){
            t2[i].style.backgroundSize = "500px 300px";
            z2[i].style.backgroundSize = "500px 300px";
            u2[i].style.backgroundSize = "500px 300px";
          } else{
            t2[i].style.backgroundSize = "300px 500px";
            z2[i].style.backgroundSize = "300px 500px";
            u2[i].style.backgroundSize = "300px 500px";
          }
          y2[i].innerHTML='<a href="">' + description + '</a>';

          var infowindow1 = new google.maps.InfoWindow({
            content: contentString
          });

           google.maps.event.addListener(marker[i], 'click', function() {
            id = this.id;
            createClickable(id);
            if (currentInfoWindow != null) {
            currentInfoWindow.close();
            }
            infowindow1.open(map, this);
            currentInfoWindow = infowindow1;
            setTimeout(function() {
              var img = new Image();
              var img2 = new Image();
              img.src = after;
              img2.src = before;
              var t = document.getElementById('myFigure');
              t.style.background = "url('"+after+"')";
              var z = document.getElementById('divisor');
              var u = document.getElementById('container');
              z.style.background = "url('"+before+"')";
              if (img.width >= img.height){
                t.style.backgroundSize = "700px 500px";
                z.style.backgroundSize = "700px 500px";
                u.style.backgroundSize = "700px 500px";
              } else{
                t.style.backgroundSize = "500px 700px";
                z.style.backgroundSize = "500px 700px";
                u.style.backgroundSize = "500px 700px";
              }
              var y = document.getElementById('desc');
              y.innerHTML = description;
            }, 800);

          });
          i = i + 1;
        }
    });
    var styles = [
      [{
        url: 'https://firebasestorage.googleapis.com/v0/b/dublinslider.appspot.com/o/aungierstreet2%2FAungier%20Street2%201950.jpg?alt=media&token=dbccaf2d-d973-4184-aeed-44fcb9c4d1a2',
        height: 64,
        width: 64,
        anchor: [16, 0],
        textColor: '#fff',
        textSize: 10
      }, {
        url: 'https://firebasestorage.googleapis.com/v0/b/dublinslider.appspot.com/o/aungierstreet2%2FAungier%20Street2%201950.jpg?alt=media&token=dbccaf2d-d973-4184-aeed-44fcb9c4d1a2',
        height: 64,
        width: 64,
        anchor: [24, 0],
        textColor: '#fff',
        textSize: 11
      }, {
        url: 'https://firebasestorage.googleapis.com/v0/b/dublinslider.appspot.com/o/aungierstreet2%2FAungier%20Street2%201950.jpg?alt=media&token=dbccaf2d-d973-4184-aeed-44fcb9c4d1a2',
        height: 64,
        width: 64,
        anchor: [32, 0],
        textColor: '#fff',
        textSize: 12
      }]
    ];

    markerClusterer = new MarkerClusterer(map, marker, {
      styles: styles[0]
    });
  });
}

function createClickable(numer){
  query.orderByChild("id").once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        name = childSnapshot.key;
        nameId = childSnapshot.val()['id'];

        if (nameId == numer){
          finalId = id;
          console.log(finalId);
          description = childSnapshot.val()['description'];
          before = childSnapshot.val()['before'];
          after = childSnapshot.val()['after'];
        }
      });
    });
}

function initMap() {
  var dublin = {lat: 53.355924, lng: -6.329348};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: dublin
  });

  createMarker();
  $('.myType').each(function() {
   var elem = $(this);

   // Save current value of element
   elem.data('oldVal', elem.val());

   // Look for changes in the value
   elem.bind("propertychange change click keyup input paste", function(event){
      // If value has changed...
      if (elem.data('oldVal') != elem.val()) {
       // Updated stored value
       elem.data('oldVal', elem.val());

       var esto = document.getElementById("new").value;
       $("#content2").empty();

       query.orderByChild("id").once("value")
         .then(function(snapshot) {
           var i = 0;
           snapshot.forEach(function(childSnapshot){
             description = childSnapshot.val()['description'];
             var comp = description.includes(esto);

             console.log(comp);
             if(comp == true){
               var contentStringBar = '<div class="container2"><p id="id"></p><strong class="desc2"></strong><div class="comparison2"> '+
                 '<figure class="myFigure2">' +
                   '<div class="handle2"></div>' +
                   '<div class="divisor2"></div>' +
                 '</figure>' +
                 '<input type="range" min="0" max="100" value="50" class="slider2" oninput="moveDivisor2('+i+')">' +
               '</div></div>';
               document.getElementById("content2").innerHTML += contentStringBar;
               console.log(contentStringBar);

               slider2 = document.getElementsByClassName("slider2");
               handle2 = document.getElementsByClassName("handle2");
               z2 = document.getElementsByClassName("divisor2");

               var t2 = document.getElementsByClassName("myFigure2");
               var u2 = document.getElementsByClassName("container2");
               var y2 = document.getElementsByClassName('desc2');

               description = childSnapshot.val()['description'];
               before = childSnapshot.val()['before'];
               after = childSnapshot.val()['after'];

               var img3 = new Image();
               var img4 = new Image();
               img3.src = after;
               img4.src = before;

               t2[i].style.background = "url('"+after+"')";
               z2[i].style.background = "url('"+before+"')";
               if (img3.width >= img3.height){
                 t2[i].style.backgroundSize = "500px 300px";
                 z2[i].style.backgroundSize = "500px 300px";
                 u2[i].style.backgroundSize = "500px 300px";
               } else{
                 t2[i].style.backgroundSize = "300px 500px";
                 z2[i].style.backgroundSize = "300px 500px";
                 u2[i].style.backgroundSize = "300px 500px";
               }
               y2[i].innerHTML='<a href="">' + description + '</a>';
               i = i + 1;
             }
           });

         });
     }
   });
 });
}

function moveDivisor() {
  handle.style.left = slider.value+"%";
	divisor.style.width = slider.value+"%";
}

function moveDivisor2(i) {
  handle2[i].style.left = slider2[i].value+"%";
	z2[i].style.width = slider2[i].value+"%";
}
