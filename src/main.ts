import { Component, signal} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { FctFilterPeople, PEOPLE, updatePeople } from './data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: `./main.html`,
  styleUrl: './main.scss',
  imports: [CommonModule, FormsModule]
})
export class App {
/**
   * Filter functions for students and non-students
   */
  readonly fAll:        FctFilterPeople = () => true;
  readonly fStudent:    FctFilterPeople = p => p.isStudent;
  readonly fNotStudent: FctFilterPeople = p => !p.isStudent;
  
  // The filter to apply
  readonly f = signal<FctFilterPeople>( this.fAll );

  // The people to be added add
  readonly peopleToAdd = signal<PEOPLE>({isStudent: false, name: "", forename: "", size: 0});

  // The list of peoples to display in the table
  readonly data = signal<readonly PEOPLE[]>( [
    {isStudent: false, name: "Kelso", forename: "Bob", size: 172},
    {isStudent: true, name: "Dorian", forename: "John", size: 177},
  ] );



  // Update the attribute N of a PEOPLE with value i
  updatePeople<N extends keyof PEOPLE>(i: N, v: PEOPLE[N]): void {
    this.peopleToAdd.update( p => updatePeople(p, i, v) )
  }

  // Append a new people to data
  appendPeople(people: PEOPLE): void {
    this.data.update( L => [...L, {...people}] );
  }

  // Remove a people from data
  removePeople(people: PEOPLE): void {
    this.data.update( L => L.filter( p => p !== people) )
  }}

bootstrapApplication(App);
