export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items, user) {
        items.forEach(item => {
            this._renderer(item, user);
        });
    }

    addItem(item, position) {
        switch (position) {
            case 'prepend': this._container.prepend(item); break;
            case 'append': this._container.append(item); break;
            default: this._container.prepend(item);
        }
    }

}