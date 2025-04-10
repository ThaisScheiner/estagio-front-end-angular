import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Aluno } from '../../models/aluno.model';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alunos-list.component.html',
  styleUrl: './alunos-list.component.scss',
})
export class AlunosListComponent implements OnInit {
  alunos: Aluno[] = [];
  novoAluno: Aluno = {
    ra: '',
    ano: 2025,
    nome: '',
    equipe: '',
    orientador: '',
    tema: '',
    observacoes: ''
  };
  editando: string | null = null;

  filtroNome: string = '';
  filtroEquipe: string = '';
  anoBusca: string = '';

  sortColumn: string = '';
  sortAsc: boolean = true;

  nomeArquivo: string = '';

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    // Observa atualizações
    this.alunoService.alunos$.subscribe(alunos => {
      this.alunos = alunos;
    });

    this.alunoService.alunosAtualizados$.subscribe(() => {
      this.carregarAlunos();
    });

    // Primeira carga
    this.carregarAlunos();

    this.alunoService.nomeArquivoImportado$.subscribe(nome => {
      this.nomeArquivo = nome;
    });

  }

  salvarAluno() {
    if (this.editando) {
      this.alunoService.atualizar(this.editando, this.novoAluno).subscribe({
        next: () => {
          this.resetarFormulario();
          this.carregarAlunos();
          alert('Aluno atualizado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao atualizar aluno:', err);
          alert('Erro ao atualizar aluno. Verifique os dados e tente novamente.');
        }
      });
    } else {
      this.alunoService.inserir(this.novoAluno).subscribe({
        next: () => {
          this.resetarFormulario();
          this.carregarAlunos();
          alert('Aluno salvo com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao salvar aluno:', err);
          alert('Erro ao salvar aluno. Verifique os dados e tente novamente.');
        }
      });
    }
  }
  

  editar(aluno: Aluno) {
    this.novoAluno = { ...aluno };
  
    this.editando = aluno.ra;
    this.filtroNome = '';
    this.filtroEquipe = '';
    this.anoBusca = '';

     //força o cálculo do ano mesmo sem digitar nada
  this.atualizarAnoPeloRA();
  
    setTimeout(() => {
      document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  atualizarAnoPeloRA() {
    const ra = this.novoAluno.ra;
    if (ra.length >= 8) {
      const anoDoRa = ra.substring(6, 8);
      const anoCompleto = parseInt(anoDoRa, 10);
  
      // Converte para ano completo: 50+ vira 1900, senão 2000
      this.novoAluno.ano = anoCompleto >= 50 ? 1900 + anoCompleto : 2000 + anoCompleto;
    }
  }
  

  deletar(ra: string) {
    const confirmado = window.confirm('Tem certeza que deseja excluir este aluno?');
    if (confirmado) {
      this.alunoService.deletar(ra).subscribe(() => {
        this.carregarAlunos();
      });
    }
  }


  buscarPorNome() {
    this.alunoService.buscarPorNome(this.filtroNome).subscribe(alunos => {
      this.alunoService.atualizarLista(alunos);
    });
  }

  buscarPorEquipe() {
    this.alunoService.buscarPorEquipe(this.filtroEquipe).subscribe(alunos => {
      this.alunoService.atualizarLista(alunos);
    });
  }

  buscarPorAno() {
    const ano = parseInt(this.anoBusca.trim());
    if (!isNaN(ano)) {
      this.alunoService.buscarPorAno(ano).subscribe(alunos => {
        this.alunoService.atualizarLista(alunos);
      });
    } else {
      this.carregarAlunos(); // se campo estiver vazio ou inválido
    }
  }

  ordenarPor(coluna: keyof Aluno) {
    if (this.sortColumn === coluna) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = coluna;
      this.sortAsc = true;
    }

    this.alunos.sort((a, b) => {
      const valorA = a[coluna] ?? '';
      const valorB = b[coluna] ?? '';

      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return this.sortAsc ? valorA - valorB : valorB - valorA;
      } else {
        return this.sortAsc
          ? valorA.toString().localeCompare(valorB.toString())
          : valorB.toString().localeCompare(valorA.toString());
      }
    });
  }

  private resetarFormulario() {
    this.novoAluno = {
      ra: '',
      ano: 2025,
      nome: '',
      equipe: '',
      orientador: '',
      tema: '',
      observacoes: ''
    };
    this.editando = null;
  }

  private carregarAlunos() {
    this.alunoService.listar().subscribe(alunos => {
      this.alunoService.atualizarLista(alunos);
    });
  }
}
