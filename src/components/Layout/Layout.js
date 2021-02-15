import React from 'react';
import Aux from '../../hoc/Auxiliary'

const layout = (props) => {
    return (
        <Aux>
            <div>
                Toolbar, SideDrawer, Backdrop 
            </div>
            <main>
                {props.chidren}
            </main>
        </Aux>
    )
}

export default layout;