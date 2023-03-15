import Phaser from 'phaser';

var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  pixelArt: true,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config);
var controls;
var marker;
var map;

function preload ()
{
  this.load.image('tiles', '../assets/final/grid-item.jpg');
  this.load.image('transparent_tile', '../assets/final/transparent-grid-item.jpg')
}

function create ()
{
  map = this.make.tilemap({ key: 'map' });
  var tiles = map.addTilesetImage('Desert', 'tiles');
  var layer = map.createLayer('Ground', tiles, 0, 0);

  marker = this.add.graphics();
  marker.lineStyle(2, 0x000000, 1);
  marker.strokeRect(0, 0, 6 * map.tileWidth, 6 * map.tileHeight);

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  var cursors = this.input.keyboard.createCursorKeys();
  var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5
  };
  controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

  var help = this.add.text(16, 16, 'Left-click to fill the selected region.', {
      fontFamily: 'Arial',
      fontSize: '18px',
      padding: { x: 10, y: 5 },
      backgroundColor: '#000000',
      fill: '#ffffff'
  });
  help.setScrollFactor(0);
}

function update (time, delta)
{
  controls.update(delta);

  var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

  // Rounds down to nearest tile
  var pointerTileX = map.worldToTileX(worldPoint.x);
  var pointerTileY = map.worldToTileY(worldPoint.y);

  // Snap to tile coordinates, but in world space
  marker.x = map.tileToWorldX(pointerTileX);
  marker.y = map.tileToWorldY(pointerTileY);

  if (this.input.manager.activePointer.isDown)
  {
      // Fill the tiles within an area with sign posts (tile id = 46)
      map.fill(46, pointerTileX, pointerTileY, 6, 6);
  }

}