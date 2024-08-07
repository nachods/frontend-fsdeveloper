import React from 'react';
import styles from './Registration.module.css';

const RegistrationForm = () => {
  return (
    <div className={styles.gradientcontainer}>
      <div>
				<input
					type="text"
					name="firstname"
					placeholder="Nombre"
				/>
        <input
					type="email"
					name="email"
					placeholder="Correo Electronico"
				/>
        <input
					type="password"
					name="password"
					placeholder="Contraseña"
				/>
        
			</div>
    </div>  )
}

export default RegistrationForm