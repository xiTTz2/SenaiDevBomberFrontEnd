import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {XYZ, Cluster,  Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import * as Proj from 'ol/proj.js';//Converter cordenadas para lat e long
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
} from 'ol/style';
import {boundingExtent} from 'ol/extent';
import { UsuarioService } from '../services/usuario.service';
import { Overlay } from 'ol';
import { MangueiraService } from '../services/mangueira.service';
import { ValvulaService } from '../services/valvula.service';
import { usuario } from '../models/usuario';

@Component({
  selector: 'app-tela-mapa',
  templateUrl: './tela-mapa.component.html',
  styleUrls: ['./tela-mapa.component.scss']
})
export class TelaMapaComponent implements OnInit {

  constructor(private usuarioService:UsuarioService, private mangueiraSer: MangueiraService, private valvulasSer: ValvulaService) { }

  ngOnInit(): void {

  }

 
  @ViewChild("popup") popup!: ElementRef;
  display:  string = "none";
  clicado: any;
  overlay!: Overlay;
  pontos: any;
  mangueiras: any;
  valvulas: any;
  @ViewChild("map") mapLoad!: ElementRef

  async ngAfterViewInit(){
    

    
    this.pontos  = await this.usuarioService.list()
    this.mangueiras = await this.mangueiraSer.list() 
    this.valvulas = await this.valvulasSer.list() 


    

    this.overlay = new Overlay({
      element: this.popup.nativeElement
    })

    const map = this.MapaCreate();
    

    this.pontos.forEach(u => {

      //Faz a filtragem de dados pegando apenas as data de validade das mangueiras e valvulas
      u['valvulas'] = this.valvulas.filter(v => v.usuario.id == u.id).map(v => v.dataDeValidade)
      u['mangueiras'] = this.mangueiras.filter(m => m.usuario.id == u.id).map(m => m.dataDeValidade)

      
      let data = [u['valvulas'],u['mangueiras']].sort()[0]
      u['dataDeValidade'] = new Date(data)//coloca os dados em uma só list para organizar
    
    })


    const doisAnos = new Date().setFullYear(2020)
    const umAno = new Date().setFullYear(2022)//Anos top para funcionar


    
  
   
    const colors = ["red", "green", "#b0bf1a"]
    

    const conjuntos = [
      
      this.pontos.filter(u => u.dataDeValidade <= umAno),// cluster vermelho
      this.pontos.filter(u => u.dataDeValidade >= doisAnos),//cluster verde
      this.pontos.filter(u => u.dataDeValidade <= umAno && u.dataDeValidade >= doisAnos),//cluster amarelo
      
    
    ]
    

    for(let i = 0; i < conjuntos.length;i++){

      const cluster = this.cluster(conjuntos[i], colors[i]);
    
      map.addLayer(cluster);
      this.cliqueEventMapa(map, cluster);

       
  }
 
   
  }


  private cliqueEventMapa(map: Map, cluster: any) {
    map.on('click', (evento) => {
      this.display = 'none'
      cluster.getFeatures(evento.pixel).then((clickedFeatures: any) => {
        if (clickedFeatures.length) {
          const features = clickedFeatures[0].get('features');
          if (features.length > 1) {
            const extent = boundingExtent(
              features.map((r: any) => r.getGeometry().getCoordinates())
            );
            map
              .getView()
              .fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
          }else if(features.length == 1 && this.display == 'none'){
            this.clicado = features[0].get('pontos')
            this.display = 'block';
            this.overlay.setPosition(evento.coordinate)
          }
        }
      });
    });
  }


  private MapaCreate(){


    const latitude = -48.613666;
    const longitude = -27.595115;

    const raster = new TileLayer({
      source: new XYZ({
        url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
      }),
    });

    const map = new Map({
      layers: [raster],
      target: 'map',
      overlays: [this.overlay],
      view: new View({
        center: Proj.fromLonLat([latitude, longitude]),
        zoom: 14,
      }),
    });

  
    return map;
  }


  

  private cluster(pontos: usuario[], color: string){
    const features: any[] = [];
    
    for (let i = 0; i < pontos.length; ++i) {
      const ponto = Proj.fromLonLat([
        pontos[i].longitude,
        pontos[i].latitude,
      ]);
    
      const f = new Feature(new Point(ponto))
      f.set('pontos', pontos[i]),
      features.push(f);

    }

    const source = new VectorSource({
      features: features,
    });

    const clusterSource = new Cluster({
      distance: 80,
      source: source,
    });

    const styleCache: any = {};

    const clusters = new VectorLayer({
      source: clusterSource,
      style: function (feature) {
        const size = feature.get('features').length;
        let style = styleCache[size];
        if (!style) {
          style = new Style({
            
            image: new CircleStyle({
              
              radius: 14,
              
              stroke: new Stroke({
                color,
              }),
              fill: new Fill({
                color,
              }),
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#fff',

              }),
              scale: 1.3,
            }),
          });
          styleCache[size] = style;
        }
        return style;
      },
    });

    return clusters;
  }

  

}
