import React,{useEffect,useState} from 'react';
import {BackHandler,ScrollView,Text,View} from 'react-native';
import {ajuste,configurar} from './src/data/archivo';
import {Catalogo} from './src/ui/Catalogo';
import {Mesa} from './src/ui/Mesa';
import {Lista,Opcion,s} from './src/ui/componentes';
import {iniciarPrograma,marcar,usePrograma} from './src/ui/programaModel';

type Inicio = {taskKey:string; offlineStart?:boolean};
type Navegacion = {seccion:string; id:string|null; dia:number; tema:string};
const inicial: Navegacion = {seccion:'Programa', id:null, dia:0, tema:'Todos'};

export default function App({taskKey,offlineStart}:Inicio) {
  const [lista,setLista] = useState(false);
  const [nav,setNav] = useState<Navegacion>(inicial);
  // Serialize navigation writes: rapid filter changes must not overwrite newer state.
  const escritura = React.useRef<Promise<unknown>>(Promise.resolve());
  useEffect(()=>{
    let activa = true;
    (async()=>{
      if (offlineStart) await configurar('disponible','no');
      const guardada = await ajuste('navegacion:'+taskKey, '');
      if (activa) {
        if (guardada) {
          try {
            const parsed = JSON.parse(guardada) as Navegacion;
            setNav({...inicial,...parsed});
          } catch { /* invalid old state: start fresh */ }
        }
        setLista(true);
        void iniciarPrograma();
      }
    })();
    return ()=>{activa=false;};
  },[taskKey,offlineStart]);
  const cambiar = (cambios:Partial<Navegacion>) => {
    setNav(anterior=>{
      const siguiente = {...anterior,...cambios};
      escritura.current = escritura.current.catch(() => {}).then(() =>
        configurar('navegacion:'+taskKey, JSON.stringify(siguiente)));
      return siguiente;
    });
  };
  useEffect(()=>{
    const sub = BackHandler.addEventListener('hardwareBackPress',()=>{
      if (nav.id) {cambiar({id:null}); return true;}
      if (nav.seccion!=='Programa') {cambiar({seccion:'Programa'}); return true;}
      return false;
    });
    return ()=>sub.remove();
  },[nav]);
  return lista ? <Portada nav={nav} cambiar={cambiar}/> : <Text>Abriendo agenda…</Text>;
}

function Portada({nav,cambiar}:{nav:Navegacion;cambiar:(c:Partial<Navegacion>)=>void}) {
  const {charlas,aviso} = usePrograma();
  const ficha = charlas.find(f=>f.id===nav.id);
  return <View style={s.pagina}><Text>Jornadas del Sur</Text>
    <Text style={s.titulo}>{nav.id?'Detalle':nav.seccion}</Text>
    {!!aviso && <Text accessibilityRole="alert" style={s.texto}>{aviso}</Text>}
    <ScrollView style={{flex:1}}>
      {nav.id ? <View><Opcion texto="Volver" accion={()=>cambiar({id:null})}/>
        {ficha ? <View><Text style={s.titulo}>{ficha.title}</Text><Text style={s.texto}>
          Día {ficha.day} · {ficha.time} · {ficha.room}</Text>
          <Text>{ficha.speaker}</Text><Text style={s.texto}>{ficha.summary}</Text>
          <Opcion texto={ficha.favorita?'Quitar de mi agenda':'Agregar a mi agenda'} accion={()=>void marcar(ficha.id)}/>
        </View> : <Text>Esta charla ya no figura en el programa.</Text>}</View>
      : nav.seccion==='Programa' ? <Catalogo abrir={id=>cambiar({id})}
          dia={nav.dia} elegirDia={dia=>cambiar({dia})}
          tema={nav.tema} elegirTema={tema=>cambiar({tema})}/>
      : nav.seccion==='Mesa' ? <Mesa/> : <View>
        {!charlas.some(f=>f.favorita) && <Text>Todavía no agregaste charlas.</Text>}
        <Lista fichas={charlas.filter(f=>f.favorita)} abrir={id=>cambiar({id})}/></View>}
    </ScrollView>
    {!nav.id && <View style={s.fila}>{['Programa','Mi agenda','Mesa'].map(t=>
      <Opcion key={t} texto={t} activa={nav.seccion===t} accion={()=>cambiar({seccion:t})}/>)}</View>}
  </View>;
}
