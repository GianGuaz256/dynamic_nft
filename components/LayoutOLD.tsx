import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = ({children}) =>{
    return (
        <React.Fragment>
            <Header/>
                {children}
            <Footer/>
        </React.Fragment>
    )
}

export default Layout;