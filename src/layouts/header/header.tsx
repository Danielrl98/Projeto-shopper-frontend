import { Fragment } from 'react'
import { theme } from '../../theme/'

export default function Header(){

    return(
        <Fragment>
            <section style={ Style.header}>
                <div className="container">
                    <img src={theme.img.logo}></img>
                </div>
            </section>
        </Fragment>
    )
}

const Style = {
    header: {
        backgroundColor: '#1E2044',
        padding:'8px 0 8px 0',
    }
}