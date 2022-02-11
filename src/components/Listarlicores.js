import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../styles/styles.css";

const Listarlicores = () => {
  const [licores, setLicores] = useState(null);
  const [listarLicores, setListarlicores] = useState(null)
  console.log(licores);

  const formik = useFormik({
    initialValues: {
      busqueda: "",
    },
    onSubmit: (datos) => {
      console.log(datos.busqueda);
      axios
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${datos.busqueda}`
        )
        .then((datos) => {
          setLicores(datos.data.drinks);
        });
    },
  });

  //Guardar en firebase

  const guardar = (licores) => {
    const nuevoLicor = {
      nombre: licores.strDrink,
    };
    addDoc(collection(db, "licores"), nuevoLicor)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Listar firebase

  useEffect(() => {
    obtenerFirebase()
  }, [])
  

  const obtenerFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, "licores"));
    const licores = [];
    querySnapshot.forEach((doc) => {
        licores.push({
            ...doc.data(),
        });
    });
    setListarlicores(licores);
    
};
console.log(listarLicores)

  return (
    <div>
      <form className="form-group" onSubmit={formik.handleSubmit}>
        <h1>caracteristicas licor</h1>
        <div className="form-group">
          <div>
            <input
              className="form-group"
              type="text"
              name="busqueda"
              placeholder="busqueda"
              onChange={formik.handleChange}
            />
            <button type="submit">Buscar</button>
          </div>
        </div>
      </form>

      <div>
        {licores &&
          licores.map((licores, index) => (
            <div key={index} className="div">
              <p>
                <strong>Nombre:</strong> <span>{licores.strDrink}</span>
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                <span>
                  {licores.strTags === null ? "No tiene" : licores.strTags}
                </span>
              </p>
              <p>
                <strong>Instrucciones:</strong>{" "}
                <span>{licores.strInstructions}</span>
              </p>
              <p>
                <strong>Vaso/Copa:</strong> <span>{licores.strGlass}</span>
              </p>
              <p>
                <strong>Categoria:</strong> <span>{licores.strCategory}</span>
              </p>
              <button type="button" onClick={() => guardar(licores)}>
                Guardar
              </button>
            </div>
          ))}
      </div>
      <div className="listar">
          {
          listarLicores && listarLicores.map((e, index) => (
              <div  key={index}>
                  <h1>{e.nombre}</h1>
                  <button className="eliminar">Eliminar</button>
              </div>
          )) 
          }
      </div>
    </div>
    
  );
};

export default Listarlicores;
