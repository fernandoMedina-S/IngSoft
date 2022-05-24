import ImageCard from "../../assets/card.jpg";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import isAdmin from "../../util/users";

const EventCard = (props) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const admin = isAdmin(user.uid);

  const deleteEvent = () => {
    const cardID = props.idElem;
    const docRef = doc(db, "events", cardID);
    deleteDoc(docRef).then(() => {
      navigate(0);
    });
  };

  const viewHandler = () => {
    props.openModal();
    props.setCurrent({
      title: props.title,
      description: props.description,
      reference_link: props.reference_link,
    });
  };

  return (
    <>
      <div className="event-card__main-container">
        <img className="event-card__image" src={ImageCard} height="200" />
        <div className="event-card__text-area">
          <h3>{props.title}</h3>
          <p>
            {props.description.length > 90
              ? props.description.substr(1, 90) + "..."
              : props.description}
          </p>
        </div>
        <div className="event-card__delete-button">
          <IconButton aria-label="details" color="info" onClick={viewHandler}>
            <RemoveRedEyeIcon />
          </IconButton>
          {admin && (
            <IconButton aria-label="delete" color="error" onClick={deleteEvent}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
};

export default EventCard;
