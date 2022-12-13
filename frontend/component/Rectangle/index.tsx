import styles from './rectangle.module.scss'
interface RectangleProps {
  colorBottom?: string
}

const Rectangle: React.FC<RectangleProps> = ({ colorBottom }) => {
  return (
    <>
      <div className={`${styles.top} ${styles.container}`}>
        <div className={styles.inner}></div>
      </div>
      <div className={`${styles.bottom} ${styles.container} ${styles[`${colorBottom}`]}`}>
        <div className={styles.inner}></div>
      </div>
    </>
  )
}

export default Rectangle
