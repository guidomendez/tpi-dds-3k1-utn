import React from 'react';

 function Inicio() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <h2>Bienvenido a nuestra página web</h2>
          <p>
            Utilizamos React para desarrollar esta página web porque nos permite crear interfaces de usuario interactivas de manera eficiente y escalable. React utiliza componentes reutilizables que facilitan el mantenimiento del código y la organización del proyecto. Además, su modelo de renderizado virtual optimiza el rendimiento al actualizar solo los componentes necesarios, lo que mejora la experiencia del usuario final.
          </p>
          <p>
            Hemos integrado Bootstrap para el diseño y estilización de nuestros componentes, aprovechando su colección de estilos predefinidos y componentes personalizables que aseguran una apariencia consistente y profesional en toda la aplicación.
          </p>
          <p>
            Estamos emocionados de seguir utilizando React para expandir y mejorar nuestra página web, ofreciendo funcionalidades innovadoras y una experiencia de usuario excepcional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;