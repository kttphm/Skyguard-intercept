export class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create() {
        const canvas_W = 1280;
        const canvas_H = 720;

        const ground_H = this.textures.get('ground').getSourceImage().height;
        const house_H = this.textures.get('house').getSourceImage().height;

        const ground_lv = canvas_H - ground_H;

        this.add.image(canvas_W/2, canvas_H/2, 'background');
        this.add.image(canvas_W/2, canvas_H - ground_H/2, 'ground');

        //--------------------------------------------------//
        
        const dome = this.physics.add.sprite(canvas_W/2, ground_lv - 150/2, 'dome');
        dome.setCollideWorldBounds(true);

        //--------------------------------------------------//

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

        //--------------------------------------------------//

        
    }

    update() {}
}