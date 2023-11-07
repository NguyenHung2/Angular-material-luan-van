import { Component, OnInit, ViewChild } from '@angular/core';
interface Food {
  id: number;
  value: string;
  viewValue: string;
}

interface Drink {
  id: number;
  value: string;
  viewValue: string;
}

interface User {
  id: number;
  foodId: number;
  drinkId: number; 
  viewValue: string;
}

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css']
})
export class ManageReviewsComponent {
  foods: Food[] = [
    { id: 0, value: 'steak-0', viewValue: 'Steak' },
    { id: 1, value: 'pizza-1', viewValue: 'Pizza' },
    { id: 2, value: 'tacos-2', viewValue: 'Tacos' },
  ];

  drinks: Drink[] = [
    { id: 0, value: 'coffee-0', viewValue: 'Coffee' },
    { id: 1, value: 'soda-1', viewValue: 'Soda' },
  ];

  additionalUsers: User[] = [
    { id: 0, foodId: 0, drinkId: 0, viewValue: 'User 1' }, // Khóa ngoại đến Food và Drink
    { id: 1, foodId: 1, drinkId: 1, viewValue: 'User 2' }, // Khóa ngoại đến Food và Drink
  ];

  selectedFood = this.foods[2].id;
  selectedDrink = this.drinks[0].id;
  selectedUser = this.additionalUsers[0].id;

  getFavoriteFood(userId: number): string {
    const user = this.additionalUsers.find((user) => user.id === userId);
    if (user) {
      const food = this.foods.find((food) => food.id === user.foodId);
      return food ? food.viewValue : 'Not Found';
    }
    return 'User Not Found';
  }
  
}