import React from 'react';


const styles = {
    boton_activado:{
        color: 'red',
        backgroundColor:'white'
    },
    boton_desactivado: {
        color:'green'
    },
    main_div:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    texto:{
        textAlign:'center'  
    }
    
}

class Control extends React.Component {
    constructor(props){
        console.log('los putos props');
        console.log(props)
        super(props)
        this.state = {
            //temperatura: Object.values(props.control.automatico)[0]
            temperatura: 20
        }
    }
    componentWillReceiveProps(props){
        if (props.control.automatico){
            this.setState({
                temperatura:Object.values(props.control.automatico)[0]
            })
        }
    }
    sumaTemp(){
        var temp = this.state.temperatura+1
        this.setState({
            temperatura: temp
        }) 
        if (this.props.onCambiaTemperatura){
            this.props.onCambiaTemperatura(temp);
        }
    }
    restaTemp(){
        var temp = this.state.temperatura-1
        this.setState({
            temperatura: temp
        }) 
        if (this.props.onCambiaTemperatura){
            this.props.onCambiaTemperatura(temp);
        }
    }
   
    onChange(params) {
        console.log(params.target.value);
        if (this.props.onCambiaModo){
            this.props.onCambiaModo(params.target.value);
        }
    }

    renderInput(){
        
        if (this.props.control.modo==="automatico"){
            return(
                <div style={styles.main_div}>
                <input type="button" value="+" onClick={this.sumaTemp.bind(this)}/> 
                <input type="text" style={styles.texto} value ={this.state.temperatura}/>
                <input type="button" value="-" onClick={this.restaTemp.bind(this)}/> 
            </div>
        )}
       
   }

   renderBotones(){
        var styleOn;
        var styleOff;
        var styleAuto;
        if (this.props.control.modo==="on"){
            styleOn = styles.boton_activado;
            styleOff = styles.boton_desactivado;
            styleAuto = styles.boton_desactivado;
        }else if (this.props.control.modo==="off"){
            styleOn = styles.boton_desactivado
            styleOff = styles.boton_activado;
            styleAuto = styles.boton_desactivado;
        }else if (this.props.control.modo==="automatico"){
            styleOn = styles.boton_desactivado;
            styleOff = styles.boton_desactivado;
            styleAuto = styles.boton_activado;
        }
        return(
            <div style={styles.main_div}>
            
                <input type="button" style={styleOn} value="On" onClick={this.onChange.bind(this)}/>
                <input type="button" style={styleOff} value="Off" onClick={this.onChange.bind(this)}/>
                <input type="button" style={styleAuto} value="Automatico" onClick={this.onChange.bind(this)}/>
            
            </div>
        );
    }


    render(){
       
       
        

        
        return(
            <div>
                {this.renderBotones()}
                {this.renderInput()}
            </div>
        );
    }
}

export default Control;