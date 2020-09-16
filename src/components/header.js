import React from "react"
import {Link} from "gatsby";

export default function Header() {
    return (
        <header>
            <Link to="/">
                <img src="../../logo.svg" alt="Logo"/>
            </Link>
            <h1>Game Boy Story</h1>
        </header>
    )
}