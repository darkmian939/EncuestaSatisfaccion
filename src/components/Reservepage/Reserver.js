import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import axios from '../../Api/Axiosconfig.js'; // Asegúrate de que la ruta sea correcta según tu estructura de archivos
import logo from '../../assets/img/loguito.png';
import '../../assets/css/reserve.css';

const parqueaderos = [
  { id: 1, latitude: 4.4854, longitude: -74.10019, title: 'Lavautos y Parqueadero Ferrari', tarifaCarro: 60, tarifaMoto: 52 },
  { id: 2, latitude: 4.49293, longitude: -74.10274, title: 'Parqueadero Público Alfonso López', tarifaCarro: 50, tarifaMoto: 42 },
  { id: 3, latitude: 4.5218, longitude: -74.11961, title: 'Parqueadero 24 Horas Aurora I', tarifaCarro: 56, tarifaMoto: 45 },
  { id: 4, latitude: 4.51972, longitude: -74.11756, title: 'Parqueadero Cl72asur', tarifaCarro: 50, tarifaMoto: 40 },
  { id: 5, latitude: 4.47022, longitude: -74.12693, title: 'La pláyita parqueadero Usme pueblo', tarifaCarro: 0, tarifaMoto: 48 },
];

const logoSrc = logo;

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function Reserve() {
  const [selectedParqueadero, setSelectedParqueadero] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [duracionEstancia, setDuracionEstancia] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [placaVehiculo, setPlacaVehiculo] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('carro'); // Default to car

  const handleMarkerClick = (parqueadero) => {
    setSelectedParqueadero(parqueadero);
    setPrecioTotal(0);
  };

  const handleDateChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleTimeChange = (e) => {
    setHoraInicio(e.target.value);
  };

  const handleDurationChange = (e) => {
    const duracion = parseInt(e.target.value);
    setDuracionEstancia(duracion);
    calcularPrecioTotal(duracion);
  };

  const handlePlacaChange = (e) => {
    setPlacaVehiculo(e.target.value);
  };

  const handleTipoVehiculoChange = (e) => {
    setTipoVehiculo(e.target.value);
    calcularPrecioTotal(duracionEstancia, e.target.value);
  };

  const calcularPrecioTotal = (duracion, tipo = tipoVehiculo) => {
    if (selectedParqueadero && duracion > 0) {
      const tarifa = tipo === 'moto' ? selectedParqueadero.tarifaMoto : selectedParqueadero.tarifaCarro;
      const precio = tarifa * duracion;
      setPrecioTotal(precio);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedParqueadero || duracionEstancia <= 0 || !fechaInicio || !horaInicio || !placaVehiculo) {
      alert('Por favor completa todos los campos.');
      return;
    }
  
    const reservationData = {
      parkingLotId: selectedParqueadero.id,
      startDate: fechaInicio,
      startTime: horaInicio,
      duration: duracionEstancia,
      totalPrice: precioTotal,
      plate: placaVehiculo,
      vehicleType: tipoVehiculo === 'carro' ? 'car' : 'motorcycle',
      status: 'pending' // Set status to pending by default
    };
  
    try {
      const response = await axios.post('http://localhost:3004/api/reservations', reservationData);
      console.log('Reserva creada correctamente:', response.data);
  
      // Mostrar alerta de reserva exitosa
      alert('¡Reserva exitosa!');
  
      // Reiniciar campos después de una reserva exitosa
      setSelectedParqueadero(null);
      setFechaInicio('');
      setHoraInicio('');
      setDuracionEstancia(0);
      setPrecioTotal(0);
      setPlacaVehiculo('');
      setTipoVehiculo('carro'); // o el valor predeterminado que prefieras
    } catch (error) {
      console.error('Error al crear la reserva:', error.response.data.error);
      alert('Error al crear la reserva. Por favor intenta de nuevo.');
    }
  };
  
  

  return (
    <div>
      <nav className="navbar navbar-register">
        <Link to="/">
          <img src={logoSrc} alt="Logo MiApp" className="navbar-logo" />
        </Link>
        <div className="navbar-links navbar-links-register">
           <Link to="/profile"><span>Perfil</span></Link>
          <Link to="/profile"><span>Tus reservas</span></Link>
          <Link to="/commentBox"><span>Comentarios</span></Link>

          
          <button onClick={() => alert('¡Sesión cerrada!')}>Cerrar Sesión</button>
        </div>
      </nav>
      <div className="Reserve">
        <h1 className="main-title">Reserva tu nuevo parqueadero</h1>
        <div className="map-container">
          <MapContainer center={[4.499890, -74.123456]} zoom={14} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {parqueaderos.map((parqueadero) => (
              <Marker
                key={parqueadero.id}
                position={[parqueadero.latitude, parqueadero.longitude]}
                icon={defaultIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(parqueadero),
                }}
              />
            ))}
          </MapContainer>
        </div>
        {selectedParqueadero && (
          <div className="info-box">
            <h2>Reserva en {selectedParqueadero.title}</h2>
            <p><b>Tarifa por minuto (Carro):</b> ${selectedParqueadero.tarifaCarro}</p>
            <p><b>Tarifa por minuto (Moto):</b> ${selectedParqueadero.tarifaMoto}</p>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="fechaInicio">Fecha de inicio:</label>
                <input type="date" id="fechaInicio" value={fechaInicio} onChange={handleDateChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="horaInicio">Hora de inicio:</label>
                <input type="time" id="horaInicio" value={horaInicio} onChange={handleTimeChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="duracionEstancia">Duración de la estancia:</label>
                <select id="duracionEstancia" value={duracionEstancia} onChange={handleDurationChange} required>
                  <option value="30">30 minutos</option>
                  <option value="40">40 minutos</option>
                  <option value="60">1 hora</option>
                  <option value="120">2 horas</option>
                  <option value="180">3 horas</option>
                  <option value="240">4 horas</option>
                  <option value="300">5 horas</option>
                  <option value="360">6 horas</option>
                  <option value="420">7 horas</option>
                  <option value="720">Medio día (12 horas)</option>
                  <option value="1440">Día completo</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="placaVehiculo">Placa del vehículo:</label>
                <input type="text" id="placaVehiculo" value={placaVehiculo} onChange={handlePlacaChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="tipoVehiculo">Tipo de vehículo:</label>
                <select id="tipoVehiculo" value={tipoVehiculo} onChange={handleTipoVehiculoChange} required>
  <option value="carro">Carro</option>
  <option value="moto">Moto</option>
</select>
              </div>
              <div className="form-group">
                <label>Total de precio:</label>
                <input type="text" value={`$${precioTotal}`} readOnly />
              </div>
              <button type="submit">Reservar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reserve;
