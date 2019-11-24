/* Modulo para calcular el consumo */
import {bbddGetAllEventsAndInit} from './cloud';
import {FechaAMomento,MomentoAFecha} from './Fechas';
 var moment = require('moment');


const consumoGetTotal=(inicio,listaHoras)=>{
    var consumoSegundos=0;
    var encendidoAnterior=inicio;
    var inicioCuenta=null;
    var finCuenta=null;

    listaHoras.forEach( (element,index,array) => {
       if (index===0){  // Primer item de la lista
            if (encendidoAnterior===1){    // Partiamos de encendido, ponemos en 00
                inicioCuenta="00:00:00";    
            }
        }
        if (element.encendido !== encendidoAnterior){   // Cambio con el item anterior
            if (element.encendido===1){                 // Y en este caso es encendido, antes apagado
                inicioCuenta=element.id;               // Guardo el inicio de cuenta    
            }
            else{                                       // Es apagado, antes era encendido
                finCuenta=element.id;                  // Guardo el fin de la cuenta
            }
        }
        encendidoAnterior=element.encendido;
        consumoSegundos += consumoIncrementoTiempo(inicioCuenta,finCuenta);
        if (inicioCuenta && finCuenta){
            inicioCuenta=null;
            finCuenta=null;
        }
    });
    return consumoSegundos;
}

const consumoIncrementoTiempo= (horaInicial,horaFinal)=>{
    var iniMoment,finMoment,difMoment;
    if (!horaInicial || !horaFinal) // Si no son intervalos correctos devolvemos 0
        return 0;
    iniMoment=moment('2000-01-01 '+horaInicial);
    finMoment=moment('2000-01-01 '+horaFinal);
    difMoment=moment.duration(finMoment.diff(iniMoment));
    return difMoment.as('seconds');
}

const consumoPorDia = (dia) =>{
    var promesa = new Promise((resolve,reject)=>{
        bbddGetAllEventsAndInit(FechaAMomento(dia))
        .then((resp)=>{
            const con = consumoGetTotal(resp.inicio,resp.items);
            resolve(con);
        })
    })    
    return promesa;
}

export const consumoEnIntervalo = (fechaInicial,fechaFinal) => {
    return new Promise((resolve,reject)=>{
        const inicio = FechaAMomento(fechaInicial);
        const final = FechaAMomento(fechaFinal);
        const diffMoment = moment.duration(final.diff(inicio));
        const dias = diffMoment.as("days");
        var i=0;
        var listaFechas=[];
        for (i===0;i<=dias;i++){
            listaFechas.push(MomentoAFecha(inicio));
            inicio.add(+1,'day');
        }
        Promise.all(listaFechas.map(consumoPorDia))
        .then(valores=>{
            var arrayCompleto=[];
            valores.forEach((element,index) => {
            arrayCompleto.push({X:listaFechas[index], Y:element});
            });
            resolve(arrayCompleto); 
        })
    })
}




