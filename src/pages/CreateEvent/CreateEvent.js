import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CreateEvent = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = e.target;
    console.log(data);
    if (!data.title || !data.description) {
      console.log("error");
    } else {
      try {
        await setDoc(doc(db, "events", Math.random()), {
          title: data.title,
          description: data.description,
          reference_link: data.reference_link ? data.reference_link : "",
        });
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <div className="create-event__main-container">
      <form className="create-event__form" onSubmit={handleSubmit}>
        <h2>Informaciòn del evento</h2>
        <TextField name="title" id="title" label="Titulo" variant="standard" />
        <TextField
          name="description"
          id="description"
          label="Descripcion"
          variant="standard"
        />
        <TextField
          name="reference_link"
          id="reference_link"
          label="Enlace de referencia"
          variant="standard"
        />
        <Button
          className="create-event__button"
          variant="contained"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default CreateEvent;
