import styles from "../page.module.css";

export default function UniversalDate({ lang, date }) {
  const dateObject = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (lang == "en") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span className={styles.date}>{dateObject.getFullYear()}</span>
        <span className={styles.date}>{`${
          months[dateObject.getMonth()]
        } ${dateObject.getDate()}`}</span>
      </div>
    );
  } else {
    return <span className={styles.date}>{date}</span>;
  }
}
