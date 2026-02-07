function climaSol({ sys, timezone }) {

  function convertirHora(utc) {

    const horaCiudad = (utc + timezone) * 1000; 
    return new Date(horaCiudad).toLocaleTimeString("es-CO", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  }

  const amanecer = convertirHora(sys.sunrise);
  const atardecer = convertirHora(sys.sunset);

  return (
    <div className='clima-container'>
      <h4>Sol ☀️</h4>
      <p>🌅 Amanecer: {amanecer}</p>
      <p>🌇 Atardecer: {atardecer}</p>
    </div>
  );
}

export default climaSol;
