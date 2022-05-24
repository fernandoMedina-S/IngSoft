import { useAuth } from "../../context/AuthContext";
import profilePicture from "../../assets/profile.png";
import isAdmin from "../../util/users";
import Button from "@mui/material/Button";

const Profile = () => {
    const { user, logout } = useAuth();
    const admin = isAdmin(user.uid);
    const image = user.photoURL;

    return (
        <div className="profile__main-container">
            <div className="profile__profile-container">
                <div className="profile__imgage">
                    <img src={image ? image : profilePicture}/>
                    <h2>¡Bienvenido, {user.displayName ? user.displayName : "Usuario anónimo"}!</h2>
                    <h3>Correo: {user.email ? user.email : "Usuario anónimo"}</h3>
                    <p>Tu cuenta es de {admin ? "Profesor" : "Alumno"}</p>
                    <Button variant="contained" color="info" onClick={()=>logout()}>Salir</Button>
                </div>
            </div>
        </div>
    )
}

export default Profile;