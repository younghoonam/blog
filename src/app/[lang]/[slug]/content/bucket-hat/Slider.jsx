"use client";

// Libraries
import { useEffect, useRef, useState } from "react";

// Styles
import styles from "./Slider.module.css";

export default function Parameter({
  min = 0,
  max = 100,
  defaultValue = 50,

  label = "",
  id = "",
  name = "",
  marks,
  ticks = 10,
  step = 1,
  isMillimeter = true,
}) {
  const sliderRef = useRef(null);
  const [value, setValue] = useState(defaultValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    const slider = sliderRef.current;
    const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--progress", `${percentage}%`);
  });

  function updatePercentage(event) {
    const slider = event.target;
    const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--progress", `${percentage}%`);
  }

  return (
    <div className={"parameterWrapper " + (ticks ? "parameterDivider" : "parameterDivider")}>
      <div className={`${styles.parameterContainer} ${ticks ? styles.tickSpace : null}`}>
        <div className={styles.parameterLabel}>
          <label htmlFor={id}>{label}</label>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.sliderContainer}>
            <input
              ref={sliderRef}
              className={`${styles.slider} ${ticks ? styles.ticking : styles.notTicking}`}
              type="range"
              id={id}
              step={step}
              name={name}
              min={min}
              max={max}
              onChange={(e) => {
                onChange(e);
                updatePercentage(e);
              }}
            />
            {ticks ? (
              <div className={styles.ticks}>
                {Array.from({ length: ticks }, (_, i) =>
                  (i + 1) % 5 === 1 ? (
                    <span key={i} className={styles.tick + " " + styles.thick}></span>
                  ) : (
                    <span key={i} className={styles.tick}></span>
                  )
                )}
              </div>
            ) : null}
            {marks ? (
              <div className={styles.marks}>
                {marks.map((mark) => (
                  <span
                    className={styles.mark}
                    key={mark.value}
                    style={{
                      left: `${((mark.value - min) / (max - min)) * 100}%`,
                    }}
                  >
                    {mark.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <input
            className={styles.numberArea}
            type="number"
            value={value}
            name={name}
            min={min}
            max={max}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
