
import * as firebase from 'firebase'
import {MomentoAFecha} from './Fechas'

export  const  getDatabaseId = (handler)=>{
    let ref = firebase.database().ref()
    ref.once("value")
    .then(function(snapshot){
        var id=Object.keys(snapshot.val())[0];
        handler(id)
    })  
    return ref;
}

export const eventoEstado = (id,handler) =>{
    let ref = firebase.database().ref(id+'/estado')
    ref.on("value",(snapshot)=>{
       handler(snapshot.val());
    })
    return ref;
}
export const eventoEstadoRegistro = (id,registro,handler) =>{
    let ref = firebase.database().ref(id+'/conf/'+registro)
    ref.on("value",(snapshot)=>{
        handler(snapshot.val());
    })
    return ref;
}
export const eventoControl = (id,handler) =>{
    let ref = firebase.database().ref(id+'/control')
    ref.on("value",(snapshot)=>{
        handler(snapshot.val());
    })
    return ref;
}
export const eventoRegistroYEventos = (tipo,dia,handler) =>{
    var ref;
    getDatabaseId((id)=>{
        ref = firebase.database().ref(id+ '/'+tipo+ '/'+dia+'/');
        ref.on("value",(snapshot)=>{
            var auxReg=[];
            snapshot.forEach(function(child){
                var item = child.val();
                item.id = child.key;    
                auxReg.push(item);
            });
            handler(auxReg);
        })
        return ref;
    })
}

export const eventoConf = (handler) =>{
    var ref;
    getDatabaseId((id)=>{
        ref = firebase.database().ref(id+'/conf');
        ref.on("value",(snapshot)=>{
            var auxReg=[];
            snapshot.forEach(function(child){
                var item = child.val();
                item.id = child.key;  
                    auxReg.push(item);
                });
        
            handler(auxReg);
        })
        return ref;
    })
}

export const bbddCambiaModo=(modo)=>{
    getDatabaseId((id)=>{
        var refModo = firebase.database().ref(id+'/control/modo');
        refModo.set(modo.toLowerCase())
    })
    
}
export const bbddCambiaTemperaturaObjetivo=(temperatura)=>{
    getDatabaseId((id)=>{
        var refTemp = firebase.database().ref(id+'/control/automatico/temperatura')
        refTemp.set(temperatura);
    })
}
export const bbddCambiaConf = (conf)=>{
    getDatabaseId((id)=>{
        var refConf = firebase.database().ref(id+'/conf/'+conf.id);
        refConf.set(conf);
    })
}
export const bbddDeleteConf = (id) =>{
    getDatabaseId((dbId)=>{
        var refConf=firebase.database().ref(dbId+'/conf/'+id);
        refConf.remove();
    })
}
export const bbddCreaConfiguracion = (conf) =>{
    getDatabaseId((id)=>{
        var newKey = firebase.database().ref(id+'/conf/').push().key;
        var updates={};
        updates[id+'/conf/'+newKey] = conf;
        firebase.database().ref().update(updates);
    })
}

export const bbddGetLastItemFromEvent = (dia,handler) =>{
    getDatabaseId((id)=>{
        let ref = firebase.database().ref(id+'/eventos/'+dia);
        ref.limitToLast(1).once("value",(snapshot)=>{
            if (snapshot.val() === null){
                handler(null);
            }
            else{
                const item=Object.values(snapshot.val())[0];
                if (handler){
                    handler(item);
                    }
                }
            }
        )
    })
}

export const bbddGetAllEvents = (dia,handler) =>{
    getDatabaseId((id)=>{
        const ref = firebase.database().ref(id+ '/eventos/'+dia);
        ref.on("value",(snapshot)=>{
            var auxReg=[];
            snapshot.forEach(function(child){
                var item = child.val();
                item.id = child.key;    
                auxReg.push(item);
            });
            handler(auxReg);
        })
    })
}
export const bbddGetAllEventsAndInit=(mDia) =>{
    var promesa = new Promise ((resolve,reject)=>{
        const diaHoy = MomentoAFecha(mDia);
        const diaAntes=mDia.add(-1,'days');
        bbddGetLastItemFromEvent( MomentoAFecha(diaAntes),(item)=>{
            const itemAnt=item;
            bbddGetAllEvents(diaHoy,(items)=>{
                itemAnt === null ? resolve({inicio:0,items: items}) : resolve({inicio:itemAnt.encendido,items:items});
            })            
        })
    })
    return promesa;
}

