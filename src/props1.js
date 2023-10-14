
import style from './card.module.css'

function Card(props) {

    console.log(props)

    const { data } = props
    const { name, age, city } = data

    return (

        <div >
            <div className={style.card}>
                <p>{name} {age}</p>
                <p>{city}</p>
            </div>
        </div>
    )
}



export default Card