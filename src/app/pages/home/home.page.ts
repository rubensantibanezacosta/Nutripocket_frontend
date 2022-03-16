import { Component } from '@angular/core';
import { Day } from '../../models/day';
import * as moment from 'moment';
import { Dish } from '../../models/dish';
import { DayServiceService } from '../../services/day-service.service';
import { ItemService } from '../../services/item.service';
import 'hammerjs';
import { EvolutionService } from '../../services/evolution.service';
import { Evolution } from '../../models/evolution';
import {
  ModalController,
  LoadingController,
  PopoverController,
} from '@ionic/angular';
import { AddItemModalPage } from './add-item-modal/add-item-modal.page';
import { AddItemPopoverPage } from 'src/app/pages/home/add-item-modal/add-item-popover/add-item-popover.page';
import { Item } from 'src/app/models/item';
import { PopoverPage } from 'src/app/components/popover/popover.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  MINUTES_IN_HOUR: number = 60;
  HOURS_IN_DAY: number = 24;
  MINUTES_IN_A_DAY = this.MINUTES_IN_HOUR * this.HOURS_IN_DAY;

  date: Date = new Date();
  currentDay: Day;
  evolution: Evolution = new Evolution();
  calendarEmptyIcon = '../../../assets/icon/calendar-empty.svg';

  constructor(
    private dayService: DayServiceService,
    private itemService: ItemService,
    private evolutionService: EvolutionService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private popoverController: PopoverController
  ) {}
  dayFoods = [
    {
      dayFood: 'Desayuno',
      icon: 'moon-outline',
      color: 'tertiary',
    },
    {
      dayFood: 'Media mañana',
      icon: 'sunny-outline',
      color: 'warning',
    },
    {
      dayFood: 'Almuerzo',
      icon: 'sunny',
      color: 'danger',
    },
    {
      dayFood: 'Merienda',
      icon: 'partly-sunny',
      color: 'danger',
    },
    {
      dayFood: 'Cena',
      icon: 'moon',
      color: 'tertiary',
    },
  ];

  daytotals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    saturatedFat: 0,
    sugar: 0,
    fiber: 0,
    salt: 0,
  };

  ionViewDidEnter() {
    this.getCurrentDay();
    this.setTotalsToZero();
    this.getLastEvolution();
  }

  getCurrentDay() {
    this.dayService.findDayByUserAndDate(this.date).subscribe(
      (day) => {
        if (!day[0]) {
          let newDay = new Day();
          newDay.date = this.date;
          this.dayService.createDay(newDay).subscribe((data) => {
            this.currentDay = data;
            if (this.currentDay) {
              this.calculateTotals(this.currentDay);
            }
          });
        } else {
          this.currentDay = day[0];
          if (this.currentDay) {
            this.calculateTotals(this.currentDay);
          }
        }
      },
      (error) => {
        console.error(error.message);
      }
    );
  }

  round(number: number) {
    return Math.round(number);
  }

  formatDate(date: Date) {
    return moment(date).locale('ES').format('dddd[, día ]D[ de ]MMMM');
  }

  calculateTotals(day: Day) {
    day.dishes.forEach((day) => {
      day.items.forEach((item) => {
        this.daytotals.calories +=
          (item.dosex * item.food.doseg * item.food.calories100g) / 100;
        this.daytotals.carbs +=
          (item.dosex * item.food.doseg * item.food.carbs100g) / 100;
        this.daytotals.fat +=
          (item.dosex * item.food.doseg * item.food.fat100g) / 100;
        this.daytotals.protein +=
          (item.dosex * item.food.doseg * item.food.protein100g) / 100;
        this.daytotals.saturatedFat +=
          (item.dosex * item.food.doseg * item.food.saturatedfat100g) / 100;
        this.daytotals.sugar +=
          (item.dosex * item.food.doseg * item.food.sugar100g) / 100;
        this.daytotals.fiber +=
          (item.dosex * item.food.doseg * item.food.fiber100g) / 100;
        this.daytotals.salt +=
          (item.dosex * item.food.doseg * item.food.salt100g) / 100;
        this.currentDay.daycalorieseaten = this.daytotals.calories;
      });
    });
    const caloriesReqPerMinute =
      this.evolution.caloriesburned /
        this.HOURS_IN_DAY /
        this.MINUTES_IN_HOUR || 0;
    const sportsCaloriesPerMinutes = 0;
    const minutesOfSport = 0;
    const sportsBurnedCalories = sportsCaloriesPerMinutes + minutesOfSport;
    const minutesOfBasal = this.MINUTES_IN_A_DAY - minutesOfSport;
    const basalTotalCalories = minutesOfBasal * caloriesReqPerMinute;
    this.currentDay.daycaloriesburn = sportsBurnedCalories + basalTotalCalories;
    this.dayService.updateDay(this.currentDay.id, this.currentDay).subscribe(
      (res) => {
        return;
      },
      (error) => console.error(error.message)
    );
  }
  calculateDishCalories(dish: Dish) {
    let calories: number = 0;
    dish.items.forEach((item) => {
      calories += (item.dosex * item.food.doseg * item.food.calories100g) / 100;
    });
    return Math.round(calories);
  }

  calculateDishProtein(dish: Dish) {
    let protein: number = 0;
    dish.items.forEach((item) => {
      protein += (item.dosex * item.food.doseg * item.food.protein100g) / 100;
    });
    return Math.round(protein);
  }

  calculateDishCarbs(dish: Dish) {
    let carbs: number = 0;
    dish.items.forEach((item) => {
      carbs += (item.dosex * item.food.doseg * item.food.carbs100g) / 100;
    });
    return Math.round(carbs);
  }

  calculateDishFat(dish: Dish) {
    let fat: number = 0;
    dish.items.forEach((item) => {
      fat += (item.dosex * item.food.doseg * item.food.fat100g) / 100;
    });
    return Math.round(fat);
  }

  nextDate() {
    this.date = new Date(moment(this.date).add('1', 'days').format());
    this.setTotalsToZero();
    this.ionViewDidEnter();
  }

  previousDate() {
    this.date = new Date(moment(this.date).subtract('1', 'days').format());
    this.setTotalsToZero();
    this.getCurrentDay();
    this.setTotalsToZero();
    this.getLastEvolution();
  }

  setTotalsToZero() {
    this.daytotals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      saturatedFat: 0,
      sugar: 0,
      fiber: 0,
      salt: 0,
    };
  }

  recalculateDish(dishid: number, foodofday: number) {
    return this.itemService.regenerateItemsOfDish(dishid, foodofday).subscribe(
      (data) => {
        this.getCurrentDay();
        this.setTotalsToZero();
        this.getLastEvolution();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(
      (data) => {
        this.getCurrentDay();
        this.setTotalsToZero();
        this.getLastEvolution();
      },
      (error) => console.log(error.message)
    );
  }

  getLastEvolution() {
    this.evolutionService.getLastEvolution().subscribe(
      (evolution) => {
        this.evolution = evolution;
      },
      (error) => console.error(error.message)
    );
  }

  //CSS Animations
  PushToDeleteById(id, target) {
    document.getElementById(id).style.animationDuration = '2.5s';
    document.getElementById(id).style.animationFillMode = 'forwards';
    document.getElementById(id).style.animationName = 'deleteToLeft';
    target.style.animationDuration = '2.5s';
    target.style.animationFillMode = 'forwards';
    target.style.animationName = 'deleteToLeft';
    target.parentNode.style.animationDuration = '2.5s';
    target.parentNode.style.animationFillMode = 'forwards';
    target.parentNode.style.animationName = 'deleteToLeft';
  }

  async showAddItemModal(dayfood: number, dayid: number, dishid: number) {
    const modal = await this.modalController.create({
      component: AddItemModalPage,
      componentProps: {
        dayfood,
        dayid,
        dayfoodName: this.dayFoods[dayfood].dayFood,
        dishid: dishid,
      },
    });
    modal.onDidDismiss().then(() => {
      this.getCurrentDay();
      this.setTotalsToZero();
      this.getLastEvolution();
    });
    return await modal.present();
  }

  async regenerateDay() {
    const confirm = await this.popoverController.create({
      component: PopoverPage,
      componentProps: {
        message: 'Se borrará el dia actual. ¿Deseas continuar?',
      },
      showBackdrop: true,
      size: 'cover',
      animated: true,
      backdropDismiss: true,
    });
    confirm.onDidDismiss().then((response) => {
      if (response.data === true) {
        this.loading(
          'Estamos calculando tu dieta de hoy, espera unos segundos...'
        );
        this.dayService.regenerateDay(this.date).subscribe(
          (data) => {
            this.getCurrentDay();
            this.setTotalsToZero();
            this.getLastEvolution();
            this.loadingController.dismiss();
          },
          (error) => console.error(error)
        );
      }
    });
    return await confirm.present();
  }

  async editFoodWeight(item: Item, dayfood: number, dishid) {
    const popover = await this.modalController.create({
      component: AddItemPopoverPage,
      componentProps: {
        dayfood: dayfood,
        dayid: this.currentDay.id,
        foodid: item.food.id,
        dosex: item.dosex,
        dishid: dishid,
      },
      showBackdrop: true,
    });

    popover.onDidDismiss().then((itemReturned) => {
      if (itemReturned.data) {
        this.itemService
          .updateItem(item.id, <Item>itemReturned.data, dishid)
          .subscribe(async (res) => {
            this.getCurrentDay();
            this.setTotalsToZero();
            this.getLastEvolution();
          });
      }
    });
    return await popover.present();
  }

  async generateWeek() {
    const confirm = await this.popoverController.create({
      component: PopoverPage,
      componentProps: {
        message:
          'Se borrará el día de hoy y los posteriores. ¿Deseas continuar?',
      },
      showBackdrop: true,
      size: 'cover',
      animated: true,
      backdropDismiss: true,
    });
    confirm.onDidDismiss().then((response) => {
      if (response.data === true) {
        this.loading(
          'Estamos calculando tu dieta semanal, espera unos segundos...'
        );
        this.dayService.generateWeek().subscribe(
          (res) => {
            setTimeout(() => {
              this.getCurrentDay();
              this.setTotalsToZero();
              this.getLastEvolution();
              this.loadingController.dismiss();
            }, 1000);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
    return await confirm.present();
  }

  async loading(message) {
    const loading = await this.loadingController.create({
      message,
      mode: 'ios',
      spinner: 'crescent',
    });
    await loading.present();
  }
}
