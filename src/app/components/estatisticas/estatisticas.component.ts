import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.scss'
})
export class EstatisticasComponent implements OnInit {
  stats: any;
  chartData: any[] = [];
  view: [number, number] = [700, 400];
  showLegend = true;

// Exemplos de usar com '[scheme]'
//'vivid', 'natural', 'cool', 'fire', 'solar', 'air', 'aqua', 'flame', 'ocean'

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunoService.obterEstatisticas().subscribe(dados => {
      this.stats = dados;
      this.chartData = [
        { name: 'Orientados', value: this.stats.orientados },
        { name: 'Não Orientados', value: this.stats.total - this.stats.orientados }
      ];
    });
  }
}
