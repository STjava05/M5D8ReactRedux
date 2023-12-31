import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../components/ratingStar.css";
import { setPostRate } from "./reducers/api";

// il componente RatingStar, che viene per consentire all'utente di selezionare
// una valutazione a stelle per il libro.
//Durante il passaggio del mouse sopra una stella, viene chiamata la funzione setHover 
//per impostare lo stato hover sul valore della valutazione corrispondente.

const RatingStar = () => {
  const dispatch = useDispatch();
  const postRate = useSelector((state) => state.api.postRate);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setRating(postRate);
  }, [postRate]);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    dispatch(setPostRate(ratingValue));
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};
export default RatingStar;
