/**
 * Slider component for parameter input.
 */
import { useEffect, useRef, useState, memo } from 'react'
import styles from './Slider.module.css'

interface Mark {
  value: number
  label: string
}

interface SliderProps {
  min?: number
  max?: number
  defaultValue?: number
  label?: string
  id?: string
  name?: string
  marks?: Mark[]
  ticks?: number
  step?: number
}

function Slider({
  min = 0,
  max = 100,
  defaultValue = 50,
  label = '',
  id = '',
  name = '',
  marks,
  ticks = 10,
  step = 1,
}: SliderProps) {
  const sliderRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(defaultValue)

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value))
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    const percentage = ((Number(slider.value) - min) / (max - min)) * 100
    slider.style.setProperty('--progress', `${percentage}%`)
  })

  function updatePercentage(event: React.ChangeEvent<HTMLInputElement>) {
    const slider = event.target
    const percentage = ((Number(slider.value) - min) / (max - min)) * 100
    slider.style.setProperty('--progress', `${percentage}%`)
  }

  return (
    <div className={'parameterWrapper ' + (ticks ? 'parameterDivider' : 'parameterDivider')}>
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
                onChange(e)
                updatePercentage(e)
              }}
            />
            {ticks ? (
              <div className={styles.ticks}>
                {Array.from({ length: ticks }, (_, i) =>
                  (i + 1) % 5 === 1 ? (
                    <span key={i} className={styles.tick + ' ' + styles.thick}></span>
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
  )
}

export default memo(Slider)
export { Slider }
