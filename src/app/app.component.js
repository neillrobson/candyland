import template from './app.template';
import model from './app.model';
import { render } from 'lit-html';

class AppComponent {
    init() {
        this.appElement = document.querySelector("#app");
        this.initEvents();
        this.renderComponent();
    }

    initEvents() {
        // TODO
    }

    renderComponent() {
        render(template(model), this.appElement);
    }
}

export default new AppComponent();