import React from "react"
import {Link} from "gatsby";

export default function Pagination(props) {
    function Next(props) {
        if (props.currentPage < props.totalPages) {
            return <Link to={"/" + (props.currentPage + 1)}> ... &#9654;</Link>;
        }

        return <span className="disabled"> ... &#9654;</span>;
    }

    function Prev(props) {
        if (props.currentPage > 1) {
            return <Link to={"/" + (props.currentPage - 1)}>&#9664; ... </Link>;
        }

        return <span className="disabled"> &#9664; ... </span>;
    }

    return (
        <div className="pagination">
            <Prev currentPage={props.currentPage} />
            <span>{props.currentPage}</span>
            <Next currentPage={props.currentPage} totalPages={props.totalPages} />
        </div>
    )
}