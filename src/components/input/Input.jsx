import React, { useEffect } from 'react'
import "./../input/input.css"

const Input = ({ type, value, onChange }) => {


    useEffect(() => {

        const inputs = document.querySelectorAll(".input");

        function focusFunction() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function blurFunction() {
            let parent = this.parentNode.parentNode;
            if (this.value == "") {
                parent.classList.remove("focus");
            }
        }
        inputs.forEach(input => {
            input.addEventListener("focus", focusFunction);
            input.addEventListener("blur", blurFunction);
        });
    }, [])


    return (
        <>
            <div className="input-div">

                <div>

                    <h5>Ingresar Link Youtube</h5>
                    <input
                        className='input'
                        type={type}
                        value={value}
                        onChange={onChange}
                    />

                </div>

            </div>

        </>
    )
}

export default Input