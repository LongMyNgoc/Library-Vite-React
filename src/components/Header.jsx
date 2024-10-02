import React from 'react';
import cnttLogo from '../Pictures/CNTT.png';
import hcmueLogo from '../Pictures/HCMUE.png';

const Header = () => (
    <header className="d-flex justify-content-between align-items-center">
        <img src={cnttLogo} alt="CNTT" className="header-logo" />
        <h1 style={{ color: 'red' }}>LIBRARY</h1>
        <img src={hcmueLogo} alt="HCMUE" className="header-logo" />
    </header>
);

export default Header;
