export class shape {
    constructor({ props }) {
        const { scene: scene, x: x, y: y, text: text, style: style, cols: cols, rows: match = {}, titles = [] } = props;
        this.scene = scene;
        scene;
        x;
        y;
        text;
        style;
        cols;
        match;
        titles;
        // scene.add.existing(this);
        this.scene.add.text(text);
        for (let index = 0; index < titles.length; index++) {
            let title = titles[index];
            let tableContentHead = {
                x: x,
                y: y,
                text: title.toUpperCase(),
                style: style
            };
            this.scene.make.text(tableContentHead)
            for (let index = 0; index < match.length; index++) {
                let content = match[index];
                let tableContentBody = {
                    x: x,
                    y: y,
                    text: content.toUpperCase(),
                    style: style
                };
                this.scene.make.text(tableContentBody);
            }

        }
    }
}