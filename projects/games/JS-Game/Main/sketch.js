let ship;
let rocket;
let rockets;
let asteroid;
let asteroids;
let blackAster;
let normAster;
let hitParticle;

function setup() {
  createCanvas( 2000, 1000 );
  asteroids_vNorm_s1_0 = loadImage( "../sprites/asteroids/asteroids_vNorm_s1/Norm_0.png" );
  asteroids_vNorm_s1_1 = loadImage( "../sprites/asteroids/asteroids_vNorm_s1/Norm_1.png" );
  asteroids_vNorm_s1_2 = loadImage( "../sprites/asteroids/asteroids_vNorm_s1/Norm_2.png" );
  asteroids_vNorm_s1_3 = loadImage( "../sprites/asteroids/asteroids_vNorm_s1/Norm_3.png" );

  asteroids_vNorm_s2_0 = loadImage( "../sprites/asteroids/asteroids_vNorm_s2/Norm_0.png" );
  asteroids_vNorm_s2_1 = loadImage( "../sprites/asteroids/asteroids_vNorm_s2/Norm_1.png" );
  asteroids_vNorm_s2_2 = loadImage( "../sprites/asteroids/asteroids_vNorm_s2/Norm_2.png" );
  asteroids_vNorm_s2_3 = loadImage( "../sprites/asteroids/asteroids_vNorm_s2/Norm_3.png" );

  asteroids_vBlack_s1_0 = loadImage( "../sprites/asteroids/asteroids_vBlack_s1/Black_0.png" );
  asteroids_vBlack_s1_1 = loadImage( "../sprites/asteroids/asteroids_vBlack_s1/Black_1.png" );
  asteroids_vBlack_s1_2 = loadImage( "../sprites/asteroids/asteroids_vBlack_s1/Black_2.png" );
  asteroids_vBlack_s1_3 = loadImage( "../sprites/asteroids/asteroids_vBlack_s1/Black_3.png" );

  asteroids_vBlack_s2_0 = loadImage( "../sprites/asteroids/asteroids_vBlack_s2/Black_0.png" );
  asteroids_vBlack_s2_1 = loadImage( "../sprites/asteroids/asteroids_vBlack_s2/Black_1.png" );
  asteroids_vBlack_s2_2 = loadImage( "../sprites/asteroids/asteroids_vBlack_s2/Black_2.png" );
  asteroids_vBlack_s2_3 = loadImage( "../sprites/asteroids/asteroids_vBlack_s2/Black_3.png" );



  bulletImage = loadImage( "../sprites/rocket/bullet.png" );
  shipImage = loadImage( "../sprites/ship/ship/ship.png" );
  ship = createSprite( width / 2, height / 2, 32, 32 );
  ship.health = 50;
  ship.addImage( "normal", shipImage );
  ship.setCollider( "circle", 0, 0, 16 );
  ship.addAnimation( "thrust", "../sprites/ship/ship/ship_0.png", "../sprites/ship/ship/ship_4.png" );
  ship.addAnimation( "win", "../sprites/ship/winShip/ship0.png", "../sprites/ship/winShip/ship8.png" );
  rockets = new Group();
  asteroids = new Group();
  smallAster = new Group();
  blackAster = new Group();
  smallASter = new Group();

  for ( var i = 0; i < random( 25, 50 ); i++ ) {
    var ang = random( 360 );
    var str = round( random( 0, 2 ) ) == 1 ? "Norm" : "Black"
    console.log( str );
    asteroidsL( 1, str, width / 2 + 1000 * cos( radians( ang ) ), height / 2 + 1000 * sin( radians( ang ) ) );
  }
}


function draw() {
  background( 46, 56, 84 );
  if ( asteroids.length === 0 ) {
    megaPowerUp();
  }
  else if ( ship.health <= 0 ) {
    fill( 255 );
    stroke( 255 );
    text( "You loose xD", widht / 2, height / 2 );
  }
  else {
    rocketL( 30, false );
    screenWrap();
    move( false );
    asteroids.overlap( rockets, Ahit );
    asteroids.overlap( ship, Phit );
    drawSprites();
  }
  //debug();
  fill( 255, 0, 0, 10 );
  rect( 10, 50, map( ship.health, 0, 50, 0, width - 25 ), 30 );
  for ( var i = 0; i < blackAster.length; i++ ) {
    blackAster[ i ].attractionPoint( 10, ship.position.x, ship.position.y );
  }
}


function megaPowerUp() {
  move( true );
  rocketL( 60000, true );
  drawSprites();
  screenWrap();
  ship.changeAnimation( "win" );
  console.log( "YEEET" );
}

function Phit() {
  ship.health--;
  print( "oof " + ship.health );
}

function Ahit( asteroid, rocket ) {
  if ( asteroid.size + 1 > 2 ) {}
  else {
    for ( var i = 0; i < random( 3, 7 ); i++ )
      asteroidsL( asteroid.size + 1, asteroid.type, asteroid.position.x, asteroid.position.y );
  }
  particle( asteroid.position.x, asteroid.position.y, asteroid.type );
  rocket.remove();
  asteroid.remove();
}

function particle( x, y, type ) {
  img = loadImage( "../sprites/hit/hitParticle.png" );
  hitParticle = createSprite( x, y, 50, 50 );
  hitParticle.addImage( img );
  hitParticle.life = 3;
  if ( type == 2 ) {
    hitParticle.scale = ( 1 );
  }
  else if ( type == 1 ) {
    hitParticle.scale = ( 3 );
  }
}


function asteroidsL( size, type, x, y ) {
  asteroid = createSprite( x, y, 32, 32 );
  var img = loadImage( "../sprites/asteroids/asteroids_v" + type + "_s" + size + "/" + type + "_" + floor( random( 0, 3 ) ) + ".png" );
  var img = addImage( "asteroids_v+" + type + "s" + size + "" )
  asteroids_vNorm_s1
  asteroid.addImage( img );
  asteroid.rotation = random( 360 );

  switch ( type ) {
    case "Black":
      blackAster.add( asteroid );
      break;
    case "Norm":
      asteroids.add( asteroid );
      break;
  }
  asteroid.setSpeed( random( 1, 3 ), random( 360 ) );

  if ( type === 1 ) asteroid.setCollider( "circle", 0, 0, 41 );
  else if ( type === 2 ) {
    asteroid.setCollider( "circle", 0, 0, 14 );
    smallAster.add( asteroid );
  }
  asteroid.maxSpeed = 2;
  asteroid.type = type;
  asteroid.size = size;
  asteroids.add( asteroid );
  return asteroid;
}

function move( win ) {
  ship.maxSpeed = 10;
  ship.friction = 0.03;
  asteroids.bounce( ship );
  asteroids.bounce( asteroids );
  if ( keyIsDown( UP_ARROW ) ) {
    ship.addSpeed( 1, ship.rotation - 90 );
    if ( win ) ship.changeAnimation( "win" );
    else ship.changeAnimation( "thrust" );
  }
  else if ( win ) ship.changeAnimation( "win" );
  else ship.changeAnimation( "normal" );
  if ( keyIsDown( LEFT_ARROW ) ) ship.rotation -= 6;
  if ( keyIsDown( RIGHT_ARROW ) ) ship.rotation += 6;
}

function rocketL( life, win ) {
  if ( win ? keyIsDown( DOWN_ARROW ) : keyWentDown( DOWN_ARROW ) ) {
    rocket = createSprite( ship.position.x, ship.position.y, 5, 5 );
    rocket.depth = 0;
    rocket.addImage( bulletImage );
    rocket.setSpeed( 15 + rocket.getSpeed(), ship.rotation - 90 );
    rocket.life = life;
    rocket.friction = 0.005;
    rocket.setCollider( "circle", 0, 0, 5 );
    rockets.add( rocket )
  }
}

function screenWrap() {
  //Wrap the screen around for all sprites.
  for ( var i = 0; i < allSprites.length; i++ ) {
    var s = allSprites[ i ];
    if ( s.position.x < -32 ) s.position.x = width + 32;
    if ( s.position.x > width + 32 ) s.position.x = -32;
    if ( s.position.y < -32 ) s.position.y = height + 32;
    if ( s.position.y > height + 32 ) s.position.y = -32;
  }
}

function debug() {
  for ( var i = 0; i < allSprites.length; i++ ) {
    allSprites[ i ].debug = true;
  }
}
