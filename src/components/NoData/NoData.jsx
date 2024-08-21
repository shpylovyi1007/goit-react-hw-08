import css from './NoData.module.css'

export default function NoData({children}) {
    return <p className={css.text}>{children}</p>
}