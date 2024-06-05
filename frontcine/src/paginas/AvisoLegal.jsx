import React from 'react';
import './LegalPages.css';

const AvisoLegal = () => (
  <div className="legal-page">
    <h1>Aviso Legal</h1>
    <section>
      <h2>Información General</h2>
      <p><strong>Titular:</strong> TapacosAutocinemas S.L.</p>
      <p><strong>Domicilio:</strong> Calle Ficticia 123, Córdoba, Andalucía</p>
      <p><strong>CIF:</strong> B12345678</p>
      <p><strong>Correo Electrónico:</strong> info@tapacosautocinemas.com</p>
    </section>
    <section>
      <h2>Condiciones de Uso</h2>
      <p>El uso de esta web atribuye la condición de usuario y supone la aceptación plena de todas las cláusulas y condiciones de uso incluidas en las páginas: Aviso Legal, Política de Privacidad y Política de Cookies.</p>
    </section>
    <section>
      <h2>Propiedad Intelectual</h2>
      <p>Todos los contenidos de esta web son propiedad de TapacosAutocinemas y están protegidos por las leyes de propiedad intelectual e industrial.</p>
    </section>
  </div>
);

export default AvisoLegal;
