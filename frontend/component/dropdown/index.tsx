import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Text from '../Text'
import IconDropdown from '../../public/icons/dropdown.svg'
import styles from './dropdown.module.scss'

interface DropdownProps {
  listDropdown: Array<{ label: string; values: string | number; icon?: React.ReactNode }>
  chooseItem?: (value: string | number, type?: string) => void
  disabled?: boolean
  value?: string
  initValue?: string
  label?: string
  name?: string
  classStyle?: string
  icon?: React.ReactNode
  initIcon?: React.ReactNode
  ref?: any
  haveScrollbar?: boolean
  option?: string
  presentDropdown?: boolean
  dietDropdown?: boolean
  dayAccessDropdown?: boolean
  handleSetKeepCurrentPage?: () => void
  textAlign?: string
}

const Dropdown: React.FC<DropdownProps> = forwardRef(
  (
    {
      dietDropdown,
      listDropdown,
      chooseItem,
      disabled,
      value,
      initValue,
      initIcon,
      label,
      name,
      classStyle,
      icon,
      haveScrollbar,
      option,
      presentDropdown,
      dayAccessDropdown,
      textAlign,
      handleSetKeepCurrentPage,
    },
    ref
  ) => {
    const [isShowDropDown, setShowDropdown] = useState(false)
    const [title, setTitle] = useState(value)
    const [buttonIcon, setButtonIcon] = useState<React.ReactNode>(icon)
    const [searchValue, setSearchValue] = useState<string>('')
    const [dropdownIndex, setDropdownIndex] = useState<number>(0)
    const dropdownRef = useRef<HTMLInputElement>(null)
    const dropdownListRef = useRef<any>(null)
    let timeout: any = null
    const UP_KEY_CODE = 38
    const DOWN_KEY_CODE = 40

    const handleClickOutside = (e: { target: any }) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowDropdown(false)
      }
    }

    const handleToggleDropdown = () => {
      setShowDropdown(!isShowDropDown)
    }

    const handleChooseItem = (value: any) => {
      setTitle(value.label)
      setButtonIcon(value.icon)
      setShowDropdown(false)
      if (chooseItem && initValue === 'All') {
        chooseItem(value.values, 'loading')
      } else if (chooseItem) {
        chooseItem(value.values)
      }
      if (handleSetKeepCurrentPage) {
        handleSetKeepCurrentPage()
      }
    }

    useImperativeHandle(ref, () => ({
      refreshModal() {
        setTitle(initValue)
        setButtonIcon(initIcon)
      },
    }))

    const alphanumeric = (event: any) => {
      const letterNumber = /^[0-9a-zA-Z]+$/
      if (event.key.match(letterNumber)) return true
      return false
    }

    const handleKeyDown = (event: any) => {
      const { key, keyCode } = event
      let currentSearchValue = searchValue.concat(key).toLowerCase()

      // Scroll dropdown to item view
      const scrollItemIntoView = (index: number, spacing: number) => {
        const itemEle = document.querySelector(`.dropdown-item-${index}`) as HTMLElement
        const itemPosition: number = itemEle?.offsetTop || (0 as number)
        dropdownListRef.current.scrollTo({
          top: itemPosition - spacing,
        })
      }

      //Hightlight found item
      const hightlight = (index: number) => {
        const itemEle = document.querySelector(`.dropdown-item-${index}`) as HTMLElement
        for (const item of document.querySelectorAll('.dropdown-item.found') as any) {
          item.classList.remove('found')
        }
        itemEle.classList.add('found')
      }

      const checkSeachValue = (value: string) => {
        const listItem = listDropdown?.map(function (item) {
          return item['label'].toLowerCase().replaceAll(' ', '')
        })
        // Check index of item include dropdown list
        const itemIndex = listItem?.findIndex(function (item) {
          return item.startsWith(value)
        })

        if (itemIndex === -1) {
          return // Return if not found match value
        } else {
          setDropdownIndex(itemIndex)
        }

        //Change dropdown value
        if (listDropdown && chooseItem) {
          setTitle(listDropdown[itemIndex].label)
          chooseItem(listDropdown[itemIndex].values)
          scrollItemIntoView(itemIndex, 0)
          hightlight(itemIndex)
        }
      }

      const controlChangeItem = (event: any, keyCode: number, num: number) => {
        event.preventDefault()

        if (
          (dropdownIndex <= 0 && keyCode === UP_KEY_CODE) ||
          (dropdownIndex >= listDropdown.length - 1 && keyCode === DOWN_KEY_CODE)
        ) {
          return false
        }

        setDropdownIndex(dropdownIndex + num)
        setTitle(listDropdown[dropdownIndex + num].label)
        chooseItem && chooseItem(listDropdown[dropdownIndex + num].values)
        scrollItemIntoView(dropdownIndex + num, 35)
        hightlight(dropdownIndex + num)
      }

      if (keyCode === DOWN_KEY_CODE) {
        controlChangeItem(event, keyCode, 1)
      }

      if (keyCode === UP_KEY_CODE) {
        controlChangeItem(event, keyCode, -1)
      }

      if (isShowDropDown && alphanumeric(event)) {
        setSearchValue(currentSearchValue)
        checkSeachValue(currentSearchValue)
      }
    }

    const handleKeyUp = () => {
      timeout = setTimeout(() => {
        setSearchValue('')
      }, 2000)
    }

    useEffect(() => {
      if (isShowDropDown && !disabled) {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
      }

      return () => {
        clearTimeout(timeout)
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keyup', handleKeyUp)
      }
    })

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
      <>
        {label && <p className={styles.label}>{label}</p>}
        <div
          className={`${styles.container} ${classStyle} ${haveScrollbar && styles[`${option}`]} ${
            dayAccessDropdown && styles.day_access
          }`}
          ref={dropdownRef}
        >
          <button
            className={`${styles.button} ${isShowDropDown && styles.active}`}
            onClick={handleToggleDropdown}
            disabled={disabled}
          >
            {buttonIcon && <div className={styles.button__icon}>{buttonIcon}</div>}
            <div className={`${styles.lable} ${textAlign && styles[`${textAlign}`]} dropdown-label`}>
              <Text content={title} color={dayAccessDropdown ? 'blue' : 'white'} size="title-7" />
            </div>
            {!disabled && (
              <div className={`${isShowDropDown && styles.rotate} ${styles.icon} arrow`}>
                <IconDropdown />
              </div>
            )}
          </button>
          {!haveScrollbar && (
            <ul
              className={`${isShowDropDown && styles.active} ${styles.menu} ${dietDropdown && styles.dietDropdown}`}
              onBlur={() => setShowDropdown(false)}
              ref={dropdownListRef}
            >
              {listDropdown?.map((option: any, index: number) => (
                <li
                  id={`dropdown-item-${index}`}
                  key={index}
                  className={`${styles.item} ${`dropdown-item-${index}`} dropdown-item ${
                    presentDropdown && styles.presentDropdown
                  } ${dietDropdown && styles.dietDropdown}`}
                  onClick={() => handleChooseItem(option)}
                >
                  <div
                    className={`${presentDropdown && styles.presentText} ${dietDropdown && styles.presentText} ${
                      dietDropdown && styles.dietText
                    }`}
                  >
                    {option.icon && <div className={styles.label_icon}>{option.icon}</div>}
                    <Text content={option.label} size={`${presentDropdown ? 'title-1' : ''}`} />
                  </div>
                </li>
              ))}
            </ul>
          )}
          {haveScrollbar && isShowDropDown && (
            <div className={`${styles['dropdown-wrapper']}`}>
              <div className={styles.listBox} ref={dropdownListRef}>
                <ul className={`${styles.menu}`} onBlur={() => setShowDropdown(false)}>
                  {listDropdown?.map((option: any, index: number) => (
                    <>
                      <li
                        key={index}
                        className={`${styles.item} ${`dropdown-item-${index}`} dropdown-item`}
                        onClick={() => handleChooseItem(option)}
                      >
                        <div className={`${styles.text} d-flex align-items-center`}>
                          <Text content={option.label} />
                        </div>
                      </li>
                      <li key={index + 1} className={styles.border}></li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
)

Dropdown.defaultProps = {
  disabled: false,
}

export default Dropdown
