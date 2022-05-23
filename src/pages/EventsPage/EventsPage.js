import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import { db } from "../../firebase";

const EventsPage = () => {
  const backData = [
    {
      title: "Titulo",
      description: "descripcion",
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let colRef = collection(db, "events");
  let cards = [];
  let events = [];
  let xd = 1;
  
  useEffect(() => {
    xd = xd +1;
    console.log(xd);

    if(xd === 3){
      setLoading(true);
      getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((docs, idx) => {
          setData({ ...docs.data(), id: docs.id });
          events.push({ ...docs.data(), id: docs.id });
        });
        setLoading(false);
        //console.log(events);
      });
    }
    
  }, []);

  return (
    <div className="event-page__main-container">
      {/* <EventCard title="Evento 1" description="Descripcion evento 1" />
      <EventCard title="Evento 1" description="Descripcion evento 1" />
      <EventCard title="Evento 1" description="Descripcion evento 1" />
      <EventCard title="Evento 1" description="Descripcion evento 1" />
      console.log(data) */}
      {loading ? (
        "Cargando"
      ) : (
        <EventCard
            title={data.title}
            description={data.description}
          />
      )}
    </div>
  );
};

export default EventsPage;
