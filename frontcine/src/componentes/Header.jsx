import React from 'react'
import '../style/headerestilo.css';

export const Header = () => {
    function cambiarTexto() {
        var select = document.querySelector('.selectheader');
        var selectedOption = select.options[select.selectedIndex];
        if (selectedOption.value !== "") {
            selectedOption.disabled = true;
        }
    }

    return (
        <header className='divheader'>
            <button class="logoheader" data-text="Awesome">
                <span class="actual-text">&nbsp;TAPACOS&nbsp;</span>
                <span aria-hidden="true" class="hover-text">&nbsp;TAPACOS&nbsp;</span>
            </button>

            <select class="selectheader" onchange="cambiarTexto()">
                <option disabled selected value="">Selecciona la ciudad</option>
                <option class='opcion' value="opcion1">TAPACOS CÓRDOBA</option>
                <option class='opcion' value="opcion2">TAPACOS SEVILLA</option>
                <option class='opcion' value="opcion2">TAPACOS MÁLAGA</option>
            </select>

        </header>
    )
}
