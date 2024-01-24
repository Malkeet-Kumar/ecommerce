import style from './style.module.css'

export default function ImageCell({src, alt}) {
    return (
        <div className={style.imageBox}>
            <img src={(src.includes("http")) ? src : "http://127.0.0.1:8000/uploads/productImages/" + src} alt={alt||null} />
        </div>
    )
}