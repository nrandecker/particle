/* sweetScroll load */
document.addEventListener("DOMContentLoaded", function () {
  new SweetScroll({/* some options */});

  /* tsParticles.loadJSON(@dom-id, @path-json); */
  tsParticles.load('tsparticles', {
    "fpsLimit": 60,
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "polygon",
        "polygon": {
          "sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "animation": {
          "enable": false,
          "speed": 1,
          "minimumValue": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "animation": {
          "enable": false,
          "speed": 19.18081918081918,
          "minimumValue": 0.1,
          "sync": false
        }
      },
      "links": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 4,
        "direction": "none",
        "random": true,
        "straight": false,
        "outMode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detectsOn": "canvas",
      "events": {
        "onHover": {
          "enable": false,
          "mode": "grab"
        },
        "onClick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "links": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "quantity": 4
        },
        "remove": {
          "quantity": 2
        }
      }
    },
    "detectRetina": true
  });

}, false);
