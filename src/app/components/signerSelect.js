import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Count extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.js-signerSelect')
        });
    }
    
    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;

        // If there are no items to show, render a little status instead
        if(store.state.items.length === 0) {
            self.element.innerHTML = `<p class="no-items">FATAL ERROR!</p>`;
            return;
        }
        
        // Loop the items and generate a list of elements
        self.element.innerHTML = `
            <select id="signer-item" class="MF-signerPattern">
                ${store.state.signers.map((signer, index) => {
                    if (true) {
                        return `
                            <option value="${index+1}">${index+1} - ${signer.nombre}</option>
                        `;
                    } 
                    else {
                        return `
                        <li draggable="true">
                            <input name="signerName${index+1}" type="text" class="MF-signerName" value="${item[0]}"placeholder="Nombre" required>
                            <input type="email" name="signerEmail${index+1}" class="MF-signerEmail" placeholder="Correo electrónico" value="${item[1]}" required>
                            <input type="hidden" name="position" value="${index+1}">
                            <button aria-label="Eliminar este firmante"><img class="MF-imgLink" src="../../assets/img/icons/icon-trash.svg"></button>
                        </li>
                    `;
                    }
                }).join('')}
            </select>
        `;
        /*
        self.element.querySelectorAll('select').forEach((select, index) => {
            select.addEventListener('change', () => {
                chooseSigner(1);
                console.log(select.options[select.selectedIndex].value);
                console.log(select.options[select.selectedIndex].text);
                //store.dispatch('clearItem', { index });
            });
        });*/
        

    }
}
