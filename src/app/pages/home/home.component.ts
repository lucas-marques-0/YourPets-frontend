import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private homeService: HomeService) { }
  
  nome: string = '';
  cor: string = '';
  raca: string = '';
  sexo: string = '';

  isLoading: boolean = true;
  showModal: boolean = false;

  pets: Array<any> = [];

  async ngOnInit() {
    if(localStorage.getItem('token') && localStorage.getItem('userID')) {
      this.isLoading = false
    } else {
      await this.router.navigate(['/'])
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  createPet() {
    return {
      nome: this.nome,
      cor: this.cor,
      raca: this.raca,
      sexo: this.sexo
    }
  }

  addPet() {
    this.pets.push(this.createPet());
    this.resetValues();
    this.showModal = false;
  }

  resetValues() {
    this.nome = '';
    this.cor = '';
    this.raca = '';
    this.sexo = '';
  }

  editPet() {
    // fazer
  }

  removePet(petName: string) {
    this.pets = this.pets.filter(pet => pet.nome !== petName);
  }
}
