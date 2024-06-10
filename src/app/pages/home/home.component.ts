import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute , private homeService: HomeService) { }

  userInfos: any;
  
  name: string = '';
  color: string = '';
  race: string = '';
  sex: string = '';

  isLoading: boolean = true;
  showModal: boolean = false;
  editMode: boolean = false;
  editedPetName: string = '';

  pets: Array<any> = [];

  async ngOnInit() {
    if(localStorage.getItem('token') && localStorage.getItem('userID')) {
      this.isLoading = false;
      const userID = this.route.snapshot.paramMap.get('id');
      this.userInfos = await this.homeService.getUserInfos(userID);
      if (this.userInfos.pets.length > 0) this.pets = this.userInfos.pets;
    } else {
      await this.router.navigate(['/']);
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
      name: this.name,
      color: this.color,
      race: this.race,
      sex: this.sex
    }
  }

  async addPet() {
    if(!this.editMode) {
      this.pets.push(this.createPet());
    } else {
      const editedPetId = this.pets.findIndex(pet => pet.name === this.editedPetName);
      this.pets[editedPetId] = this.createPet();
      this.editedPetName = '';
      this.editMode = false;
    }
    this.resetValues();
    this.closeModal();
    this.homeService.updateUserPets(this.userInfos.id, this.pets);
  }

  resetValues() {
    this.name = '';
    this.color = '';
    this.race = '';
    this.sex = '';
  }

  editPet(petName: string) {
    this.editedPetName = petName;
    const petInfos: any = this.pets.filter(pet => pet.name === petName);
    this.name = petInfos[0].name;
    this.color = petInfos[0].color;
    this.race = petInfos[0].race;
    this.sex = petInfos[0].sex;
    this.editMode = true;
    this.openModal();
  }

  removePet(petName: string) {
    this.pets = this.pets.filter(pet => pet.name !== petName);
    this.homeService.updateUserPets(this.userInfos.id, this.pets);
  }
}
