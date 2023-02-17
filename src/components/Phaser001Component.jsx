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

class Phaser001Component extends React.Component {

    constructor(props) {
        super(props);

        this.userService = userServiceInstance;

        this.config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-container',
            scale: {
                mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
                width: 800,
                height: 600
            },
            physics: {
                default: 'matter',
                matter: {
                    gravity: {
                        scale: 0
                    },
                    plugins: {
                        attractors: true
                    }
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
        this.load.image('sun', 'assets/tests/space/sun.png');
        this.load.image('alien', 'assets/sprites/space-baddie.png');
    }

    create() {
        //  You can enable the Attractors plugin either via the game config (see above), or explicitly in code:
        // this.matter.enableAttractorPlugin();

        this.matter.world.setBounds();

        this.matter.add.imageStack('alien', null, 0, 500, 50, 20, 0, 0, {
            mass: 1,
            ignorePointer: true
        });

        var sun = this.matter.add.image(400, 200, 'sun', null, {
            shape: {
                type: 'circle',
                radius: 64
            },
            plugin: {
                attractors: [
                    function (bodyA, bodyB) {
                        return {
                            x: (bodyA.position.x - bodyB.position.x) * 0.0000001,
                            y: (bodyA.position.y - bodyB.position.y) * 0.0000001
                        };
                    }
                ]
            }
        });

        this.matter.add.mouseSpring();
    }

    update(time, delta) {
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

export default Phaser001Component 