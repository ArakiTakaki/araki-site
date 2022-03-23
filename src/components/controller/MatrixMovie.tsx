import p5 from 'p5';
import { FC } from 'react';
import { mix } from '../../utils/math';
import { P5Component } from '../p5/P5Conponent';
import { range } from '../../utils/array';
import { matrixType } from './matrixTyping';
import { EaseOutQuad } from '../../utils/bezier';
import { hsl2rgb } from '../../utils/color';

class MatrixText {
    private ctx: p5;
    private textLength = 10;
    private texts = range(10).map(() => '');
    private size: number = 35;
    private y: number;
    private x: number;

    public onEdnded?: () => void;

    private intervalTokens: number[] = [];

    constructor(p5: p5, x: number, y: number) {
        this.ctx = p5;
        this.y = y;
        this.x = x;
        this.draw = this.draw.bind(this);
        this.getText = this.getText.bind(this);
        this.initialize = this.initialize.bind(this);
        this.renderText = this.renderText.bind(this);
        this.initialize();
    }

    initialize() {
        this.y -= this.ctx.windowHeight;

        const yMove = window.setInterval(() => {
            this.y += this.size;
            this.y %= this.ctx.windowHeight + this.textLength * this.size;
        }, 55);

        const typohraphy =  window.setInterval(() => {
            this.texts = this.texts.map(() => this.getText());
        }, 100);
        this.intervalTokens = [yMove, typohraphy];
    }

    destroy() {
        this.intervalTokens.map(window.clearInterval);
    }

    getText() {
        const type = matrixType[Math.floor(Math.random() * matrixType.length)];
        return type;
    }

    renderText(progress: number, textIndex: number) {
        // const t = EaseOutExpo(progress)
        const {r, g, b} = hsl2rgb(100, 100, mix(80, 10, EaseOutQuad(progress)));
        
        this.ctx.fill(r, g, b, mix(255, 100, EaseOutQuad(progress)));
        this.ctx.text(this.texts[textIndex], this.x, this.y - (textIndex * this.size));
    }

    draw() {
        this.ctx.blendMode(this.ctx.LIGHTEST);
        

        this.ctx.textSize(this.size);
        this.ctx.textStyle(this.ctx.BOLD);
        for (let i = 0; i < this.textLength; i += 1) {
            const progress = i / this.textLength;
            
            this.renderText(
                progress, 
                i
            );
        }
        this.ctx.blendMode(this.ctx.MULTIPLY);
    }
}

const circle = (p: p5) => {
    const NUMS = 40;

    const textItem: MatrixText[] = range(NUMS)
        .map(() => {
            return new MatrixText(p, Math.random() * p.windowWidth, Math.random() * p.windowHeight);
        });
    

    function draw() {
        textItem.forEach((instance) => instance.draw());
        // p.filter(p.BLUR, 5);
    }

    function beforeTick() {
        p.background(0, 50);
    }

    function afterTick() {
    }
    function initialize() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.background(0, 255);
    };

    p.setup = initialize;
    p.windowResized = initialize;
    p.draw = () => {
        beforeTick();
        draw();
        afterTick();
    };
};

export const MatrixMovie: FC = () => {
    return (
        <div>
            <div style={{
                filter: 'blur(2px)'
            }}>
                <P5Component sketch={circle} />
            </div>

            {/* 青いスクリーン */}
            <div style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                background: 'linear-gradient(#00606b, #999, #fff, #000)',
                mixBlendMode: 'soft-light',
                width: '100vw',
                height: '100vh',
            }} />

            {/* オレンジアウト */}
            <div style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                background: 'linear-gradient(rgba(0,0,0,0) 70%, #ffae00 100%)',
                mixBlendMode: 'overlay',
                width: '100vw',
                height: '100vh',
            }}/>
            <div style={{
                position: 'fixed',
                width: '30vw',
                bottom: 0,
                right: 0,
            }}
            >
                <h1 style={{
                    color: "#46cc80",
                    fontSize: '3vw',
                    textAlign: 'center',
                    margin: 0,
                    padding: 0,
                    letterSpacing: '0.3em',
                }}>
                    マテリックス
                </h1>
                <p style={{
                    color: "#46cc80",
                    fontSize: '1vw',
                    textAlign: 'center',
                    margin: 0,
                    padding: 0,
                    paddingBottom: '30px',
                    letterSpacing: '0.3em',
                }}>
                    リゾレクションズ
                </p>
                <p style={{
                    color: "#fff",
                    fontSize: '1.3vw',
                    textAlign: 'center',
                    fontFamily: 'serif',
                    margin: 0,
                    padding: 0,
                    paddingBottom: '50px',
                }}>
                    12.17
                </p>
            </div>
        </div>
    );
}
