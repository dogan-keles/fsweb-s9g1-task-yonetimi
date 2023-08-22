import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

const TaskHookForm = ({ kisiler, submitFn }) => {
  const initialValues = {
    title: "",
    description: "",
    people: [],
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
  });

  function handleSubmitCustom(data) {
    console.log(data);
    console.log("errors", data);

    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset(initialValues);
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(handleSubmitCustom)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Task başlığı yazmalısınız!",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı!",
            },
          })}
          type="text"
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız!",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı!",
            },
          })}
        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                {...register("people", {
                  validate: {
                    minOne: (perArr) =>
                      perArr.length > 0 || "Lütfen en az 1 kişi seçiniz...",
                    maxTree: (perArr) =>
                      perArr.length < 4 || "Lütfen en fazla 3 kişi seçiniz...",
                  },
                })}
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit">
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskHookForm;
