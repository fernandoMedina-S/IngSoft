import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import { db } from "../../firebase";
import Modal from "react-modal";
import eventImage from "../../assets/card.jpg";
import Button from "@mui/material/Button";

const EventsPage = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#modal");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState({});
  let colRef = collection(db, "events");
  let cards = [];
  let xd = 1;
  let subtitle;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  useEffect(() => {
    xd = xd + 1;
    console.log(xd);

    if (xd === 3) {
      let events = [];
      setLoading(true);
      getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((docs, idx) => {
          events.push({ ...docs.data(), id: docs.id });
        });
        setLoading(false);
        setData(events);
        //console.log(events);
      });
    }
  }, []);

  return (
    <div className="event-page__main-container">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="event-detail__main-container">
          <h2>Detalles del evento</h2>
          <div className="event-detail__card-container">
            <img
              src={eventImage}
              className="event-detail__image"
              height="300"
            />
            <div className="event-detail__text-container">
              <h2>{current.title}</h2>
              <p>{current.description}</p>
              <p>
                Link externo:{" "}
                {current.reference_link && current.reference_link.length > 0
                  ? <a href={current.reference_link} target="_blank">{current.reference_link}</a>
                  : "No hay link de referencia"}
              </p>
            </div>
            <Button
              variant="contained"
              color="success"
              className="event-details__back-button"
              onClick={closeModal}
            >
              Volver
            </Button>
          </div>
        </div>
      </Modal>
      {loading
        ? "Cargando"
        : data.map((elem) => {
            return (
              <EventCard
                title={elem.title}
                description={elem.description}
                reference_link={elem.reference_link ? elem.reference_link : ""}
                idElem={elem.id}
                openModal={openModal}
                setCurrent={setCurrent}
              />
            );
          })}
    </div>
  );
};

export default EventsPage;
