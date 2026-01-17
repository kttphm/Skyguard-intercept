import Turret from '../gameObjects/Turret.js';

export default class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create() {
        this.PPM = 10;
        
        this.initMap();
        
        this.life = 5;

        this.missiles = this.physics.add.group();

        this.turret = new Turret(this, this.dome, this.PPM, this.missiles);

        const textStyle = { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' };

        this.lifeText = this.add.text(20, 20, `Life : ${this.life}`, textStyle);
        this.angleText = this.add.text(20, 50, `Launch angle : ${this.turret.getLaunchAngle()}`, textStyle);
        this.missileText = this.add.text(20, 80, `Missile : ${this.turret.getCurrentMissileType()} (speed: ${this.turret.getCurrentMissileSpeed()} m/s)`, textStyle);
    }

    update() {
        this.turret.update();
        this.angleText.setText(`Launch angle : ${this.turret.getLaunchAngle()}`);
        this.missileText.setText(`Missile : ${this.turret.getCurrentMissileType()} (speed: ${this.turret.getCurrentMissileSpeed()} m/s)`);
        
        this.cleanupMissiles();
    }

    cleanupMissiles() {
        const canvas_W = this.scale.width;
        const canvas_H = this.scale.height;
        const margin = 100; // Destroy missiles slightly outside screen bounds
        
        this.missiles.children.entries.forEach(missile => {
            if (missile.x < -margin || 
                missile.x > canvas_W + margin || 
                missile.y < -margin || 
                missile.y > canvas_H + margin) {
                missile.destroy();
            }
        });
    }

    initMap() {
        const canvas_W = this.scale.width;
        const canvas_H = this.scale.height;

        const ground_H = this.textures.get('ground').getSourceImage().height;
        const house_H = this.textures.get('house').getSourceImage().height;
        const ground_lv = canvas_H - ground_H;

        this.add.image(canvas_W/2, canvas_H/2, 'background');

        const ground = this.physics.add.sprite(canvas_W/2, canvas_H - ground_H/2, 'ground');
        this.dome = this.physics.add.sprite(canvas_W/2, ground_lv - 150/2, 'dome');

        //draw houses
        const centerX = canvas_W / 2;
        const houseY = canvas_H - ground_H - house_H / 2;
        const spacing = 50;

        const startX = centerX - (2 * spacing);

        const houses = this.physics.add.group({
            key: 'house',
            repeat: 4,
            setXY: { 
                x: startX,
                y: houseY,
                stepX: spacing
            }
        });
    }
}
