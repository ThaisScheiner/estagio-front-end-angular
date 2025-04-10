import { Routes } from '@angular/router';
import { AlunosListComponent } from './components/alunos-list/alunos-list.component';
import { UploadComponent } from './components/upload/upload.component';
import { EstatisticasComponent } from './components/estatisticas/estatisticas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'alunos', pathMatch: 'full' },
  { path: 'alunos', component: AlunosListComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'estatisticas', component: EstatisticasComponent }
];
