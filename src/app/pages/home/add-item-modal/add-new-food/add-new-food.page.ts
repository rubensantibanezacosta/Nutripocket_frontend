import { FoodService } from 'src/app/services/food.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Food } from 'src/app/models/food';
import { Item } from 'src/app/models/item';
import { Data } from '@angular/router';

@Component({
  selector: 'app-add-new-food',
  templateUrl: './add-new-food.page.html',
  styleUrls: ['./add-new-food.page.scss'],
})
export class AddNewFoodPage {
  newFoodForm: FormGroup;
  dayfood: number;
  dose: number = 0;
  dosex: number;

  validationMessages = {
    name: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'minlength', message: 'Mínimo 3 caracteres' },
      { type: 'maxlength', message: 'Máximo 50 caracteres' },
    ],
    calories100g: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'max', message: 'Máximo 1000 kcal' },
    ],
    protein100g: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'max', message: 'Máximo 100 g' },
    ],
    carbs100g: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'max', message: 'Máximo 100 g' },
    ],
    sugar100g: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'max', message: 'Máximo 100 g' },
    ],
    fat100g: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'max', message: 'Máximo 100 g' },
    ],
    saturatedfat100g: [{ type: 'max', message: 'Máximo 100 g' }],
    fiber100g: [{ type: 'max', message: 'Máximo 100 g' }],
    salt100g: [{ type: 'max', message: 'Máximo 100 g' }],
    doseg: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'max', message: 'Máximo 1000 g' },
      { type: 'min', message: 'Mínimo 1 g' },
    ],
    dose: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'max', message: 'Máximo 5000 g' },
    ],
  };

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private foodService: FoodService
  ) {
    this.newFoodForm = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ])
      ),
      calories100g: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.max(1000)])
      ),
      protein100g: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.max(100)])
      ),
      carbs100g: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.max(100)])
      ),
      sugar100g: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.max(100)])
      ),
      fat100g: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.max(100)])
      ),
      doseg: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.max(1000),
          Validators.min(1),
        ])
      ),
      saturatedfat100g: new FormControl(
        '',
        Validators.compose([Validators.max(100)])
      ),
      fiber100g: new FormControl('', Validators.compose([Validators.max(100)])),
      salt100g: new FormControl('', Validators.compose([Validators.max(100)])),
      dose: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.max(5000)])
      ),
    });
  }

  closePopover() {
    return this.modalController.dismiss();
  }

  saveFood(foodForm) {
    const data: any = foodForm;
    let doseg = data.doseg;
    let dose = data.dose;
    let dosex = dose / doseg;
    this.foodService.createFood(data).subscribe((response) => {
      let item = new Item();
      item.food = response;
      item.dosex = dosex;
      return this.modalController.dismiss(item);
    });
  }
}
