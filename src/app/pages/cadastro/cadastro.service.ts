import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  async adicionarUsuario(usuario: any, email: any, senha: any): Promise<any> {
    try {
      await this.http.post('https://yourpets-backend.onrender.com/usuarios', { username: usuario, email: email, password: senha, pets: [], action: 'cadastro' }).toPromise();
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
      return await this.http.get('https://yourpets-backend.onrender.com/usuarios').toPromise();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }
  
}
