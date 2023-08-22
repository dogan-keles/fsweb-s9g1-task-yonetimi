import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
const PeopleForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isvalid },
  } = useForm({
    mode: "onChange",
  });
  // const [isim, setIsim] = useState("");
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (kisiler.includes(isim)) {
  //     setError("Bu isim daha önce eklenmiş");
  //   } else {
  //     setError(null);
  //   }
  // }, [isim, kisiler]);

  // function handleIsimChange(e) {
  //   setIsim(e.target.value);
  // }

  function myHandleSubmit(data) {
    // e.preventDefault();
    submitFn(data.title);
    reset();
    // setIsim("");
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(myHandleSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          İsim
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "İsim Yazmalısınız",
            validate: {
              filterName: (n) => {
                const lowercaseNames = kisiler.map((name) =>
                  name.toLowerCase()
                );
                return (
                  !lowercaseNames.includes(n.toLowerCase()) ||
                  "Bu isim daha önce eklenmiş!"
                );
              },
            },
          })}
          type="text"
          // onChange={handleIsimChange}
          // value={isim}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          // disabled={isim.length === 0 || error}
          disabled={isvalid}
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
