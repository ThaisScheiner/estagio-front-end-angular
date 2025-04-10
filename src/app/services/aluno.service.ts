import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../models/aluno.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlunoService {

  nomeArquivoImportado$ = new BehaviorSubject<string>('');

  private apiUrl = 'http://localhost:8080/alunos';

  // 🔔 Notificador simples
  alunosAtualizados$ = new Subject<void>();

  // 🔁 Lista reativa de alunos
  private alunosSubject = new BehaviorSubject<Aluno[]>([]);
  alunos$ = this.alunosSubject.asObservable();

  constructor(private http: HttpClient) {}

  listar(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  atualizarLista(novosAlunos: Aluno[]) {
    this.alunosSubject.next(novosAlunos);
  }

  inserir(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  atualizar(ra: string, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/${ra}`, aluno);
  }

  buscarPorNome(nome: string): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/buscar-por-nome?nome=${encodeURIComponent(nome)}`);
  }
  
  buscarPorEquipe(equipe: string): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/buscar-por-equipe?equipe=${encodeURIComponent(equipe)}`);
  }

  buscarPorAno(ano: number): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/buscar-por-ano?ano=${ano}`);
  }
  
  deletar(ra: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ra}`);
  }

  importarExcel(file: File) {
    const formData = new FormData();
    formData.append('arquivo', file);
    return this.http.post(this.apiUrl + '/importar', formData, {
      responseType: 'text',
    });
  }

  exportarExcel() {
    return this.http.get(this.apiUrl + '/exportar', {
      responseType: 'blob',
    });
  }

  obterEstatisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/percentual-orientados`);
  }
}
