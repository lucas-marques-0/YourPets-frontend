import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  async buscarUsuarios(): Promise<any> {
    try {
      return await this.http.get('https://musictaste-backend.onrender.com/usuarios').toPromise();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async logarUsuario(userID: any, password: any): Promise<any> {
    try {
      return await this.http.post('https://musictaste-backend.onrender.com/usuarios', { userID: userID, password: password, action: 'login' }).toPromise();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error); 
      return false
    }
  }

  async verificarUsuarioExistente(email: any) {
    const usuariosCadastrados: any = await this.buscarUsuarios();
    return usuariosCadastrados.find((user: any) => email === user.email);
  }
}
