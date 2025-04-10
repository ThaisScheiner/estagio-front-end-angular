import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../services/aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  mensagem = '';
  arquivoSelecionado!: File;
  nomeArquivoSelecionado: string = '';

  constructor(
    private alunoService: AlunoService,
    private router: Router
  ) { }

  onFileSelected(event: any) {
    const fileInput = event.target;
    const file: File = fileInput.files[0];

    this.mensagem = '';

    if (file) {
      this.arquivoSelecionado = file;
      this.nomeArquivoSelecionado = file.name;

      // Atualiza o nome do arquivo no service para aparecer na lista
      this.alunoService.nomeArquivoImportado$.next(file.name);

      this.alunoService.alunosAtualizados$.next();

      this.alunoService.importarExcel(this.arquivoSelecionado).subscribe({
        next: () => {
          alert('Importado com sucesso!');
          this.alunoService.atualizarLista([]);
          this.alunoService.listar().subscribe(alunos => {
            this.alunoService.atualizarLista(alunos);
          });
        },
        error: (error) => {
          console.error('Erro ao importar:', error);
          alert('Erro ao importar o arquivo');
        },
        complete: () => {
          this.alunoService.alunosAtualizados$.next();
          this.router.navigate(['/alunos']);
        }
      });

      fileInput.value = null;
    }
  }

  downloadExcel() {
    this.alunoService.exportarExcel().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'alunos_tcc_exemplo.xlsx';
      a.click();
    });
  }

  resetarInput(event: any) {
    event.target.value = null;
  }
}
