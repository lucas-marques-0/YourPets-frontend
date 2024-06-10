import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  async getUserInfos(userID: any): Promise<any> {
    const token = localStorage.getItem('token');
    try {
      return await this.http.post(`https://yourpets-backend.onrender.com/usuarios/${userID}`, { token: token }).toPromise();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async updateUserPets(userID: any, pets: any): Promise<any> {
    const token = localStorage.getItem('token');
    try {
      return await this.http.put(`https://yourpets-backend.onrender.com/usuarios/${userID}`, { token: token, userID: userID, pets: pets }).toPromise();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }
}
