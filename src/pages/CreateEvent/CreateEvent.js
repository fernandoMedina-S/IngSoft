import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/ReactToastify.min.css";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reference_link, setReference_link] = useState("");
  const navigate = useNavigate();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleLink = (event) => {
    setReference_link(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      console.log("error");
    } else {
      try {
        await setDoc(doc(db, "events", Math.random().toString()), {
          title: title,
          description: description,
          reference_link: reference_link ? reference_link : "",
        });
        setTitle("");
        setDescription("");
        setReference_link("");
        toast.success("Evento creado con éxito", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        toast.error("Error: ", error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <>
      <div className="create-event__main-container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <form className="create-event__form" onSubmit={handleSubmit}>
          <h2>Informaciòn del evento</h2>
          <TextField
            name="title"
            id="title"
            label="Titulo"
            variant="standard"
            value={title}
            onChange={handleTitle}
          />
          <TextField
            name="description"
            id="description"
            label="Descripcion"
            variant="standard"
            value={description}
            onChange={handleDescription}
          />
          <TextField
            name="reference_link"
            id="reference_link"
            label="Enlace de referencia"
            variant="standard"
            value={reference_link}
            onChange={handleLink}
          />
          <Button
            className="create-event__button"
            variant="contained"
            type="submit"
          >
            Enviar
          </Button>
          <Button
            className="create-event__back-button"
            variant="contained"
            color="info"
            onClick={()=>navigate("/events")}
          >
            Regresar
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
