
export default function Link(props) {

    return  <a href={props.url} target="_blank">
                {props.text}
            </a>
}