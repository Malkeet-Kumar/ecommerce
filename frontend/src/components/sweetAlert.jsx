import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Alert = (props) => {
    withReactContent(Swal).fire({
        icon: props.icon||"success",
        title: props.title,
        text: props.text,
        iconColor:props.iconColor||"dodgerblue",
        confirmButtonText:props.btnText||"Ok",
        timer:2000
    })
}

export default Alert