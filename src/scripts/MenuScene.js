import Phaser from 'phaser';
// import GlobalState from './GlobalState';
import { IMAGES } from './assets';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    this.load.image(IMAGES.BACKGROUND['KEY'], IMAGES.BACKGROUND['FILE']);
  }

  create() {
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'background');
    this.add
      .text(this.game.config.width / 2, this.game.config.height / 3, 'AFH INVADERS', {
        fontFamily: 'Avenir Next',
        fontSize: '64px',
        fontStyle: 'bold',
        fill: '#007fff',
      })
      .setOrigin(0.5);

    this.add
      .text(this.game.config.width / 2, this.game.config.height * (2 / 3), 'PRESS SPACE TO START', {
        fontFamily: 'Avenir Next',
        fontSize: '32px',
        fontStyle: 'bold',
        fill: '#007fff',
      })
      .setOrigin(0.5);

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}