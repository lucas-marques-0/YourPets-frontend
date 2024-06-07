import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  avatarUrl: any = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed='

  async adicionarUsuario(usuario: any, email: any, senha: any): Promise<any> {
    const avatarUsuario = this.avatarUrl + usuario;
    const listaMusicas = [
      { key: '0', value: '' },
      { key: '1', value: '' },
      { key: '2', value: '' },
      { key: '3', value: '' },
      { key: '4', value: '' },
      { key: '5', value: '' },
      { key: '6', value: '' },
      { key: '7', value: '' },
      { key: '8', value: '' },
      { key: '9', value: '' },
    ];
    try {
      await this.http.post('https://musictaste-backend.onrender.com/usuarios', { username: usuario, email: email, password: senha, avatar: avatarUsuario, musicas: listaMusicas, action: 'cadastro' }).toPromise();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error); 
      return false
    }
  }  

  async verificarUsernameExistente(username: any): Promise<boolean> {
    const usuariosCadastrados: any = await this.buscarUsuarios();
    return !!usuariosCadastrados.find((user: any) => username === user.username);
  }
  
  async verificarEmailExistente(email: any): Promise<boolean> {
    const usuariosCadastrados: any = await this.buscarUsuarios();
    return !!usuariosCadastrados.find((user: any) => email === user.email);
  }

  async buscarUsuarios(): Promise<any> {
    try {
      return await this.http.get('https://musictaste-backend.onrender.com/usuarios').toPromise();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }
  
}
