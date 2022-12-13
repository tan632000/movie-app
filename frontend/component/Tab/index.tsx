import Text from '../Text'
import styles from './tab.module.scss'

interface TabProps {
  tabItems: { id: number; label: string; value: string }[]
  tabActive: string
  setTabActive: Function
}
const Tab: React.FC<TabProps> = ({ tabItems, tabActive, setTabActive }) => {
  const handleClick = (tab: any) => {
    setTabActive(tab)
  }
  return (
    <div className={styles.container}>
      {tabItems.map((item) => (
        <div
          className={`${styles.item} ${item.label === tabActive && styles.active}`}
          key={item.id}
          onClick={() => handleClick(item)}
        >
          <Text
            content={item.label}
            size={item.label === tabActive ? 'title-4-bold' : 'title-4-light'}
            color={item.label === tabActive ? 'blue' : 'violet'}
          />
        </div>
      ))}
    </div>
  )
}

export default Tab
