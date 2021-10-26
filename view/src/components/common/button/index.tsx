import styles from './styles.module.scss'

interface PropsButton {
  type: any
  btnName: string
  onClick?: () => void
}

export function Button(props: PropsButton) {
  return (
    <button
      type={props.type}
      className={styles.btn}
      onClick={props.onClick}
    >
      {props.btnName}
    </button>
  )
}