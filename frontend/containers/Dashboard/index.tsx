import styles from "./dashboard.module.scss";
const Dashboard = () => {
  return (
    <div className={styles.main}>
      <div className={styles.bottom}>
        {/* <Modal
          idAttendee={0}
          id="createModal"
          content="createAttendee"
          title="Create Attendee"
        />
        <div className={styles.systemError}>
          <button
            className={styles.systemErrorButton}
            id="systemErrorButton"
            data-bs-toggle="modal"
            data-bs-target="#systemError"
            type="button"
          />
          <Modal
            idAttendee={0}
            id="systemError"
            content="systemError"
            title="System Error"
          />
        </div> */}
      </div>
    </div>
  );
};
export default Dashboard;
