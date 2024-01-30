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
                        generateColor('is-info');
                    }}
                    className="button is-info">
                    Party
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('family');
                        generateColor('is-success');
                    }}
                    className="button is-success">
                    Family
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('unbelievable');
                        generateColor('is-warning');
                    }}
                    className="button is-warning">
                    Unbelievable
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('children');
                        generateColor('is-danger');
                    }}
                    className="button is-danger">
                    Children
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('gaming');
                        generateColor('is-dark');
                    }}
                    className="button is-dark">
                    Gaming
                </button>
                <button
                    onClick={() => {
                        fetchExcuse('developers');
                        generateColor('is-success');
                    }}
                    className="button is-success">
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