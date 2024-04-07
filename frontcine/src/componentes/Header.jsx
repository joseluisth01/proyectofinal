import React from 'react'
import '../style/headerestilo.css';

export const Header = () => {
    return (
        <header className='divheader'>
            <button class="logoheader" data-text="Awesome">
                <span class="actual-text">&nbsp;TAPACOS&nbsp;</span>
                <span aria-hidden="true" class="hover-text">&nbsp;TAPACOS&nbsp;</span>
            </button>

            <select id="ubicacion">
                <option value="opcion1">
                    <i className="fas fa-map-marker-alt location-icon"></i> TAPACOS 1
                </option>
                <option value="opcion2">
                    <i className="fas fa-map-marker-alt location-icon"></i> TAPACOS SEVILLA
                </option>
            </select>
        </header>
    )
}
