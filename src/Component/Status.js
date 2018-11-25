import React from 'react';


class Status extends React.Component {

    render(){
        const style ={
            display:'flex',
            flex:1,
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        }
        return(
            <div style={style}>
                <h3>Encendido: {this.props.estado.encendido}</h3>
                <h3>Temperatura:{this.props.estado.temperatura}</h3>
                <h3>T.Objetivo: {this.props.estado.temperaturaObjetivo}</h3>
                <h3>{this.props.estado.fecha}</h3>
            </div>
        );
    }
}

export default Status;


