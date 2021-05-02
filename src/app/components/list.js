import Component from '../lib/component.js';
import store from '../store/index.js';

export default class List extends Component {
    
    // Pass our store instance and the HTML element up to the parent Component
    constructor() {
        super({
            store,
            element: document.querySelector('.js-items')
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
            self.element.innerHTML = `<p class="no-items">Todavia no has agregado otros firmantes 😢</p>`;
            return;
        }
        
        // Loop the items and generate a list of elements
        self.element.innerHTML = `
            <ul id="sortSigner" class="app__items">
                ${store.state.items.map((item, index) => {
                    if (store.state.ordenFirmantes == true) {
                        return `
                            <li draggable="true">
                                <img src="assets/img/move.svg" class="MF-imgDrag MF-toggle-hide">
                                <input name="signerCount${index+1}" class="MF-signerCount MF-toggle-hide" type="text" value="${index+1}">
                                <input name="signerName${index+1}" type="text" class="MF-signerName" value="${item[0]}"placeholder="Nombre" required>
                                <input type="email" name="signerEmail${index+1}" class="MF-signerEmail" placeholder="Correo electrónico" value="${item[1]}" required>
                                <input type="hidden" name="position" value="${index+1}">
                                <button aria-label="Eliminar este firmante"><img class="MF-imgLink" src="assets/img/icons/icon-trash.svg"></button>
                            </li>
                        `;
                    } 
                    else {
                        return `
                        <li draggable="true">
                            <input name="signerName${index+1}" type="text" class="MF-signerName" value="${item[0]}"placeholder="Nombre" required>
                            <input type="email" name="signerEmail${index+1}" class="MF-signerEmail" placeholder="Correo electrónico" value="${item[1]}" required>
                            <input type="hidden" name="position" value="${index+1}">
                            <button aria-label="Eliminar este firmante"><img class="MF-imgLink" src="assets/img/icons/icon-trash.svg"></button>
                        </li>
                    `;
                    }
                }).join('')}
            </ul>
        `;
        
        // Find all the buttons in the list and when they are clicked, we dispatch a 
        // `clearItem` action which we pass the current item's index to
        self.element.querySelectorAll('button').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('clearItem', { index });
            });
        });

        self.element.querySelectorAll('input[type="email"]').forEach((signerEmail, index) => {
            signerEmail.addEventListener('change', () => {
                var selectedValue = signerEmail.value;
                store.dispatch('editEmail', { index, selectedValue });
            });
        });

        self.element.querySelectorAll('input[class="MF-signerName"]').forEach((signerName, index) => {
            signerName.addEventListener('change', () => {
                var selectedValue = signerName.value;
                store.dispatch('editName', { index, selectedValue });
            });
        });
    }
};
