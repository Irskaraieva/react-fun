const Burger = ({ isActive, setIsActive }) => {

    const btnClass = isActive ? 'nav-mob-btn active' : 'nav-mob-btn';

    return (
        <>
            <button className={btnClass} onClick={() => setIsActive(!isActive)}>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
            </button>
        </>
    );
}

export default Burger;