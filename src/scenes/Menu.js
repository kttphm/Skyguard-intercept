export class Menu extends Phaser.Scene {

    constructor() {
        super('Menu');
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'space');

        const buttons = this.add.group();

        const playBtn  = this.add.sprite(640, 300, 'button');
        const tutorialBtn = this.add.sprite(640, 380, 'button');
        const settingBtn  = this.add.sprite(640, 460, 'button');
        const creditBtn  = this.add.sprite(640, 540, 'button');

        buttons.addMultiple([playBtn, tutorialBtn, settingBtn, creditBtn]);

        buttons.children.iterate((btn) => {
            btn.setInteractive({ useHandCursor: true });

            btn.on('pointerdown', function () {
                this.setTint(0xaaaaaa);
            });

            btn.on('pointerout', function () {
                this.clearTint();
            });
        });

        playBtn.on('pointerup', () => {
            playBtn.clearTint();
            this.scene.start('Game');
        });

        tutorialBtn.on('pointerup', () => {
            tutorialBtn.clearTint();
            //this.scene.start('Tutorial');
        });
        
        settingBtn.on('pointerup', () => {
            settingBtn.clearTint();
            //this.scene.launch('Setting');
        });

        creditBtn.on('pointerup', () => {
            creditBtn.clearTint();
            //this.scene.start('Credit');
        });
    }
}