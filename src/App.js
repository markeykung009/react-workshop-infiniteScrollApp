import { useEffect, useState } from "react";
import PhotoComponent from "./components/PhotoComponent";
import "./App.css";

function App() {
  const apiKey = `-Ipjr1OMy4KMBEjE2JVxAUZmX4Y63_3qcnyyBKSRkX4`;

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImage = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotos(oldData => {
        return [...oldData, ...data];
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >
          document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        setPage(oldPage => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <h1>Infinite Scroll Photo | Unsplash API </h1>
      <section className="photos">
        <div className="display-photo">
          {photos.map((el, idx) => {
            return <PhotoComponent key={idx} {...el} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
