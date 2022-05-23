import ImageCard from "../../assets/card.jpg";

const EventCard = (props) => {
  return (
    <>
      <div className="event-card__main-container">
        <img className="event-card__image" src={ImageCard} height="200" />
        <div className="event-card__text-area">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </>
  );
};

export default EventCard;
