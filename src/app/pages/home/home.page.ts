import { Component } from '@angular/core';
import { Day } from '../../models/day';
import * as moment from 'moment';
import { Dish } from '../../models/dish';
import { DayServiceService } from '../../services/day-service.service';
import { ItemService } from '../../services/item.service';
import 'hammerjs';
import { EvolutionService } from '../../services/evolution.service';
import { Evolution } from '../../models/evolution';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  


  date: Date = new Date();
  currentDay: Day;
  evolution:Evolution=new Evolution();
  calendarEmptyIcon="../../../assets/icon/calendar-empty.svg";  



  constructor(private dayService: DayServiceService, private itemService: ItemService, private evolutionService:EvolutionService) { }
  dayFoods = [
    "Desayuno",
    "Media mañana",
    "Almuerzo",
    "Merienda",
    "Cena",
  ];

  daytotals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  }


  ionViewDidEnter() {
    this.getCurrentDay();
    this.setTotalsToZero();
    this.getLastEvolution();
  }

  getCurrentDay() {
    this.dayService.findDayByUserAndDate(this.date).subscribe((day) => {
        if(!day[0]){
          let newDay=new Day();
          newDay.date=this.date;
          this.dayService.createDay(newDay).subscribe((data)=>{
            this.currentDay = data;
            if (this.currentDay) {
              this.calculateTotals(this.currentDay)
            }
          })
        }else{
          this.currentDay = day[0];
          if (this.currentDay) {
            this.calculateTotals(this.currentDay)
          }
        }

    },
      (error) => { console.log(error.message) })
  }

  round(number: number) {
    return Math.round(number);
  }

  formatDate(date: Date) {
    return moment(date).locale("ES").format("dddd[, día ]D[ de ]MMMM");
  }


  calculateTotals(day: Day) {
    day.dishes.forEach((day) => {

      day.items.forEach((item) => {
        this.daytotals.calories += item.dosex * item.food.doseg * item.food.calories100g / 100;
        this.daytotals.carbs += item.dosex * item.food.doseg * item.food.carbs100g / 100;
        this.daytotals.fat += item.dosex * item.food.doseg * item.food.fat100g / 100;
        this.daytotals.protein += item.dosex * item.food.doseg * item.food.protein100g / 100;
      })
    })
  }
  calculateDishCalories(dish: Dish) {
    let calories: number = 0;
    dish.items.forEach((item) => {
      calories += item.dosex * item.food.doseg * item.food.calories100g / 100;
    })
    return Math.round(calories);
  }

  calculateDishProtein(dish: Dish) {
    let protein: number = 0;
    dish.items.forEach((item) => {
      protein += item.dosex * item.food.doseg * item.food.protein100g / 100;
    })
    return Math.round(protein);
  }

  calculateDishCarbs(dish: Dish) {
    let carbs: number = 0;
    dish.items.forEach((item) => {
      carbs += item.dosex * item.food.doseg * item.food.carbs100g / 100;
    })
    return Math.round(carbs);
  }

  calculateDishFat(dish: Dish) {
    let fat: number = 0;
    dish.items.forEach((item) => {
      fat += item.dosex * item.food.doseg * item.food.fat100g / 100;
    })
    return Math.round(fat);
  }

  nextDate() {
    this.date = new Date((moment(this.date).add("1", "days").format()));
    this.setTotalsToZero();
    this.ionViewDidEnter();
  }

  previousDate() {
    this.date = new Date((moment(this.date).subtract("1", "days").format()));
    this.setTotalsToZero();
    this.ionViewDidEnter();

  }

  setTotalsToZero() {
    this.daytotals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  }

  recalculateDish(dishid: number, foodofday: number) {
    console.log(dishid, foodofday)
    return this.itemService.regenerateItemsOfDish(dishid, foodofday).subscribe(
      (data) => { setTimeout(() => { this.ionViewDidEnter() }, 1000) },
      (error) => { console.log(error) }
    )
  }

  deleteItem(id: number, target: any) {
    target.style.transition = "0.5s all";
    target.style.transform = "scale(0,0)"
    
    this.itemService.deleteItem(id).subscribe(
      data => this.ionViewDidEnter(),
      error => console.log(error.message)
    )
  }

  getLastEvolution(){
    this.evolutionService.getLastEvolution().subscribe(
      (evolution)=>{
        this.evolution=evolution;
      },
      error=>console.log(error.message)
    )
  }
}

