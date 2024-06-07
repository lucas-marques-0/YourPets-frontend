import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
import * as crypto from 'crypto-js'
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  constructor(private router: Router, private cadastroService: CadastroService) { }

  username: string = '';
  email: string = '';
  password: string = '';
  
  cadastroInvalido: boolean = false;
  nomeUsuarioJaExiste: boolean = false;
  emailUsuarioJaExiste: boolean = false;
  nomeUsuarioComEspacos: boolean = false;

  isLoadingCadastro: boolean = false;
  buttonText: string = 'Cadastrar';

  async onSubmit() {
    if(this.username.trim().includes(' ')) {
      this.exibirSwal('Erro!', 'error', 'Espaços não são permitidos no nome do usuário :/');
      this.username = '';
    } else {
      if (!this.validarEmail(this.email)) {
        this.exibirSwal('Erro!', 'error', 'O formato do email digitado não é válido, porfavor verifique :/');
      } else {
        this.isButtonLoading(true);
        const usuariosCadastrados = await this.cadastroService.buscarUsuarios();
        const usernameExistente = usuariosCadastrados.find((user: any) => this.username === user.username);
        const emailExistente = usuariosCadastrados.find((user: any) => this.email === user.email);
        if (usernameExistente) {
          this.exibirSwal('Erro!', 'error', 'O nome do usuário digitado já está em uso. Por favor, escolha um diferente :/');
          this.isButtonLoading(false);
        } else {
          if (emailExistente) {
            this.exibirSwal('Erro!', 'error', 'O email já está cadastrado, clique em "logar" para continuar.');
            this.isButtonLoading(false);
          } else {
            this.isButtonLoading(true);
            const senhaCriptografada = crypto.SHA256(this.password).toString(crypto.enc.Hex)
            await this.cadastroService.adicionarUsuario(this.username, this.email.trim(), senhaCriptografada).then((usuarioAdicionado) => {
              this.exibirSwal('Cadastro concluído!', 'success', 'Seu cadastro foi realizado com sucesso.');
              this.isButtonLoading(false);
              this.resetarValores();
              this.telaLogin();
            }).catch((erro) => {
              this.exibirSwal('Erro!', 'error', 'Infelizmente ocorreu um erro ao cadastrar o usuário :/');
              this.isButtonLoading(false);
              this.resetarValores();
            })
          }
        }
      }
    }
  }

  exibirSwal(titulo: string, icon: SweetAlertIcon | 'none' = 'success', texto: string): void {
    Swal.fire({
      title: titulo,
      icon: icon === 'none' ? undefined : icon,
      text: texto,
    });
  }

  validarEmail(email: any) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  isButtonDisabled(): boolean {
    return !(this.username && this.email && this.password);
  }

  isButtonLoading(isLoading: boolean) {
    if (isLoading) {
      this.isLoadingCadastro = true;
      this.buttonText = 'Aguarde...';
    } else {
      this.isLoadingCadastro = false;
      this.buttonText = 'Cadastrar';
    }
  }

  resetarValores() {
    this.email = '';
    this.password = '';
  }

  telaLogin() {
    if(!this.isLoadingCadastro) {
      this.router.navigate(['/']);
    }
  }
}
