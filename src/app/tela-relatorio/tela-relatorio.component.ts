import { Component, Injectable, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { mangueira } from '../models/mangueira';
import { valvula } from '../models/valvula';
import { MangueiraService } from '../services/mangueira.service';
import { ValvulaService } from '../services/valvula.service';
import { ElementRef, ViewChild } from '@angular/core';
import { getMargin } from 'ol/extent';
import { toSize } from 'ol/size';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tela-relatorio',
  templateUrl: './tela-relatorio.component.html',
  styleUrls: ['./tela-relatorio.component.scss']
})

@Injectable()
export class TelaConfigComponent implements OnInit {

  @ViewChild('content', {static: false}) el?: ElementRef;


  mangueiras: mangueira[] = [];
  valvulas: valvula[] = [];

  constructor(
    private vService: ValvulaService,
    private mService: MangueiraService
  ) { }

  async ngOnInit(): Promise<void> {
    this.mangueiras = (await this.mService.list()) as mangueira[];
    this.valvulas = (await this.vService.list()) as valvula[];
  }

   downloadPDF() {

     var doc = new jsPDF();


     doc.setFontSize(40);
     doc.text(`Relatório` , 75, 25);
     
 
     doc.setFillColor(50, 50, 50);
     doc.rect(40, 28+15, 30, 8, "FD");
     doc.rect(70, 28+15, 30, 8, "FD");
     doc.rect(100, 28+15, 30, 8, "FD");
     doc.rect(130, 28+15, 30, 8,"FD");
 
     doc.setFontSize(15);
     doc.setTextColor(255, 255, 255);
     doc.text("Id", 53, 44+5);
     doc.text("Validade", 75, 44+5);
     doc.text("Tipo", 110, 44+5);
     doc.text("Usuário", 135, 44+5);
 
  
   }


  pdfGenerator(){
    
    let pdf = new jsPDF()
    pdf.setFontSize(50);
    pdf.text(`Relatório` , 75, 50);


    pdf.setFontSize(20);
    pdf.text("Mangueiras" , 45, 120);
    pdf.text("Válvulas" , 135, 120);
    
    pdf.html(this.el!.nativeElement, {
      callback: (pdf) => {
    
        pdf.output('dataurlnewwindow');
       
      }, x: 80,y: 200,width: 50, windowWidth: 150
    })


    
  }



}
