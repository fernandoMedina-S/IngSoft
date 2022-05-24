import eventImage from "../../assets/card.jpg";
import Button from "@mui/material/Button";

const EventDetail = (props) => {
  return (
    <div className="event-detail__main-container">
      <h2>Detalles del evento</h2>
      <div className="event-detail__card-container">
        <img src={eventImage} className="event-detail__image" />
        <div className="event-detail__text-container">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <p>Link externo: {props.reference_link ? props.reference_link : "No hay link de referencia"}</p>
        </div>
        <Button
          variant="contained"
          color="success"
          className="event-details__back-button"
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default EventDetail;
