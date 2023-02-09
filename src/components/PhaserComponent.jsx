import React from 'react';
import { useState } from "react";
import * as Phaser from 'phaser';
import { Button } from 'primereact/button';
import { Knob } from 'primereact/knob';
import { useAuth } from '../services/AuthService'
import { userServiceInstance } from '../services/AuthService';

function BasicKnobY(values) {
    const [value, setValue] = useState(0);

    var onChange = (e) => {
        setValue(e.value)
        values.game.scene.scenes[0].data.values.logo.setVelocity(e.value, values.y);
    }

    return (
        <div className="card flex justify-content-center">
            <Knob value={value} onChange={onChange} />
        </div>
    )
}

function BasicKnobX(values) {
    const [value, setValue] = useState(0);

    var onChange = (e) => {
        setValue(e.value)
        values.game.scene.scenes[0].data.values.data.capguy.y = 400 - e.value;
    }

    return (
        <div className="card flex justify-content-center">
            <Knob value={value} onChange={onChange} />
        </div>
    )
}

class PhaserComponent extends React.Component {

    constructor(props) {
        super(props);

        this.userService = userServiceInstance;

        this.config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };

        this.state = {
            label: "default",
            seconds: 0
        };
    }

    preload() {
        this.load.multiatlas('cityscene', 'assets/cityscene.json', 'assets');
    }

    create() {
        var capguy;
        var background = this.add.sprite(400, 300, 'cityscene', 'background.png');

        capguy = this.add.sprite(0, 400, 'cityscene', 'capguy/walk/0001.png');
        capguy.setScale(0.5, 0.5);

        var frameNames = this.anims.generateFrameNames('cityscene', {
            start: 1, end: 8, zeroPad: 4,
            prefix: 'capguy/walk/', suffix: '.png'
        });

        this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
        capguy.anims.play('walk');

        this.data.set('data', {
            capguy,
            background
        });
    }

    update(time, delta) {
        var data = this.data.get('data');
        data.capguy.x += delta / 8;
        if (data.capguy.x > 800) {
            data.capguy.x = -50;
        }
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    componentDidMount() {
        if (!this.game) {
            this.game = new Phaser.Game(this.config);
        }

        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    phase1() {
        this.game.scene.scenes[0].data.values.data.capguy.y += 5;
    }
    phase2() {
        this.game.scene.scenes[0].data.values.data.capguy.y -= 5;
    }

    render() {
        return (
            <div>
                <div id="phaser-container"></div>
                <Button onClick={(e) => this.phase1()}>phase 1</Button>
                <Button onClick={(e) => this.phase2()}>phase 2</Button>
                <BasicKnobX game={this.game} x={100} y={100} />
                <BasicKnobY game={this.game} x={100} y={100} />
            </div>
        );
    }
}

export default PhaserComponent 