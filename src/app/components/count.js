import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Count extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.js-count')
        });
    }
    
    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let suffix = store.state.items.length !== 1 ? 's' : '';
        let nroFirmantes = store.state.items.length;
        let flujo = store.state.tipoFlujo;
        let emoji;
         //TODO: boolean status (valid/invalid) when no other signer info (prevalidation)

        if (flujo == 2) {
            nroFirmantes = nroFirmantes + 1;
            emoji = nroFirmantes > 0 ? '🙌' : '😢';
            this.element.innerHTML = `
            <small>Este documento lleva</small>
            <span>${nroFirmantes}</span>
            <small>firmante${suffix} hasta el momento ${emoji}, Incluido USTED.</small>
            `;
        } else {
            emoji = nroFirmantes > 0 ? '🙌' : '😢';
            this.element.innerHTML = `
            <small>Este documento lleva</small>
            <span>${nroFirmantes}</span>
            <small>firmante${suffix} hasta el momento ${emoji}, sin incluirlo a usted.</small>
             `;
        }
    }
}
