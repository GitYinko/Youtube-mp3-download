
import "./../button/BtnDownload.css"


const BtnDownload = ({ type, onClick, disabled, className }) => {

    return (
        <>
            <div className='btn-content'>
                <button
                    type={type}
                    className={className}
                    onClick={onClick}
                    disabled={disabled}
                >
                    <span>descargar</span><i></i>
                </button>
            </div>
        </>
    )
}

export default BtnDownload