// ==== Styling and CSS ==== >
import style from "./style.module.css";
import cursor_sprite_sheet from "./cursor_sprite.png";
// < ====

// ==== Types ==== >
import {MousePointerInterface} from "./mouse-pointer.interface";
// < ====

// ==== Utils ==== >
import Sprite from "../../core/sprite-engine/sprite";
// < ====

export default class MousePointer implements MousePointerInterface
{
    private static instance?: MousePointer;
    private readonly root!: Sprite;

    public Display(): void { this.root.display(document.body) };
    public Hide(): void { this.root.remove() };

    constructor()
    {
        if (MousePointer.instance) return MousePointer.instance

        this.root = MousePointer.CreateSprite();
        this.render = this.render.bind(this);

        MousePointer.instance = this;
        this.InitPointer();
    };

    private cS: boolean = false;
    private x: number = 0;
    private y: number = 0;

    private detectMove(): void
    {
        document.addEventListener('mousemove', (e): void =>
        { this.x = e.clientX; this.y = e.clientY;
            // @ts-ignore
            this.cS = e.target.getAttribute('data') === '_'});
    };

    private render(): void
    {
        this.root.callState(this.cS ? 'pointer' : 'cursor');
        this.root.nodeStyle.left = `${this.x}px`;
        this.root.nodeStyle.top = `${this.y}px`;
        requestAnimationFrame(this.render)
    };

    private InitPointer(): void
    {
        this.root.callState('cursor');
        this.detectMove();
        this.render();
    };

    private static CreateSprite(): Sprite
    {
        const cursor_state = Sprite.CreateNewState('cursor', 1, 1, false);
        const pointer_state = Sprite.CreateNewState('pointer', 2, 1, false);

        const sprite = new Sprite({
            animationStagger: 10,
            id: "cursor",
            launchState: cursor_state,
            spriteResolution_height: 30,
            spriteResolution_width: 29,
            spriteSheet: cursor_sprite_sheet,
        });

        Sprite.ConfigureNewStateFor(sprite, pointer_state);
        sprite.html.className = style.MouseSprite;

        return sprite;
    };
};
