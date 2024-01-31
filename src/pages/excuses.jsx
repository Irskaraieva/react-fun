import Axios from "axios";
import { useState } from "react";

export default function Excuses() {

    const [generatedEscuse, setGeneratedExcuse] = useState('');
    const [excuseColor, setExcuseColor] = useState('');

    const fetchExcuse = (excuse) => {
        Axios.get(`https://excuser-three.vercel.app/v1/excuse/${excuse}/`)
            .then((res) => {
                setGeneratedExcuse(res.data[0].excuse);
            });
    };

    const generateColor = (color) => {
        setExcuseColor(color);
    }

    return (
        <div className="container is-flex is-justify-content-center is-flex-direction-column">
            <h4 className="title is-4 is-flex is-justify-content-center">Generate an excuse</h4>
            <div className="buttons is-flex is-justify-content-center mb-5">
                <button
                    onClick={() => {
                        fetchExcuse('party');
                        generateColor('is-link');
                    }}
                    className="button is-link is-flex-grow-4">
                    Party
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('family');
                        generateColor('is-success');
                    }}
                    className="button is-success is-flex-grow-2">
                    Family
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('unbelievable');
                        generateColor('is-warning');
                    }}
                    className="button is-warning is-flex-grow-4">
                    Unbelievable
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('children');
                        generateColor('is-danger');
                    }}
                    className="button is-danger is-flex-grow-2">
                    Children
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('gaming');
                        generateColor('is-dark');
                    }}
                    className="button is-dark is-flex-grow-2">
                    Gaming
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('developers');
                        generateColor('');
                    }}
                    className="button btn-generate">
                    Developers
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('college');
                        generateColor('is-black');
                    }}
                    className="button is-black">
                    College
                </button>
            </div>
            <div className={`notification notification-color ${excuseColor}`}>
                <p className="has-text-centered">
                    {generatedEscuse}
                </p>
            </div>
        </div>
    )
}