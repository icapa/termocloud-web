
var moment = require('moment');

export const MomentoAFecha = (fecha)=>{
    return fecha.format().split('T')[0];
}
export const FechaAMomento = (fecha) =>{
    return moment(fecha);
}