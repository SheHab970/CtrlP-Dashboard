import { Injectable } from '@angular/core';
import { Users } from './../interface/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: Users[] = [
    {
      id: 1,
      name: 'John Doe',
      phone: '01023593352',
      order: 'Order 1',
      orderJoinDate: '2023-01-15',
      lock: true, // manually set to true
    },
    {
      id: 2,
      name: 'Jane Smith',
      phone: '01198765432',
      order: 'Order 2',
      orderJoinDate: '2023-06-10',
      lock: false, // manually set to false
    },
    {
      id: 3,
      name: 'Alice Brown',
      phone: '01255567891',
      order: 'Order 3',
      orderJoinDate: '2024-02-20',
      lock: true, // manually set to true
    },
    {
      id: 4,
      name: 'Chris Evans',
      phone: '01033344455',
      order: 'Order 4',
      orderJoinDate: '2023-03-12',
      lock: false, // manually set to false
    },
    {
      id: 5,
      name: 'Emma Watson',
      phone: '01122334456',
      order: 'Order 5',
      orderJoinDate: '2023-07-18',
      lock: true, // manually set to true
    },
    {
      id: 6,
      name: 'Liam Neeson',
      phone: '01244455566',
      order: 'Order 6',
      orderJoinDate: '2024-01-01',
      lock: false, // manually set to false
    },
    {
      id: 7,
      name: 'Sophia Turner',
      phone: '01055566677',
      order: 'Order 7',
      orderJoinDate: '2024-03-10',
      lock: true, // manually set to true
    },
    {
      id: 8,
      name: 'Daniel Craig',
      phone: '01166677788',
      order: 'Order 8',
      orderJoinDate: '2023-09-30',
      lock: false, // manually set to false
    },
    {
      id: 9,
      name: 'Mia Khalifa',
      phone: '01277788899',
      order: 'Order 9',
      orderJoinDate: '2023-11-01',
      lock: true, // manually set to true
    },
    {
      id: 10,
      name: 'Robert Downey',
      phone: '01088899900',
      order: 'Order 10',
      orderJoinDate: '2023-12-05',
      lock: false, // manually set to false
    },
    {
      id: 11,
      name: 'Chris Hemsworth',
      phone: '01189990011',
      order: 'Order 11',
      orderJoinDate: '2024-04-20',
      lock: true, // manually set to true
    },
    {
      id: 12,
      name: 'Scarlett Johansson',
      phone: '01211122334',
      order: 'Order 12',
      orderJoinDate: '2024-06-15',
      lock: false, // manually set to false
    },
    {
      id: 13,
      name: 'Mark Ruffalo',
      phone: '01098765432',
      order: 'Order 13',
      orderJoinDate: '2024-07-25',
      lock: true, // manually set to true
    },
    {
      id: 14,
      name: 'Tom Hiddleston',
      phone: '01123456789',
      order: 'Order 14',
      orderJoinDate: '2024-08-10',
      lock: false, // manually set to false
    },
    {
      id: 15,
      name: 'Tom Holland',
      phone: '01234567890',
      order: 'Order 15',
      orderJoinDate: '2024-09-18',
      lock: true, // manually set to true
    },
    {
      id: 16,
      name: 'Chris Pratt',
      phone: '01023456789',
      order: 'Order 16',
      orderJoinDate: '2024-10-05',
      lock: false, // manually set to false
    },
    {
      id: 17,
      name: 'Zoe Saldana',
      phone: '01134567890',
      order: 'Order 17',
      orderJoinDate: '2024-11-12',
      lock: true, // manually set to true
    },
    {
      id: 18,
      name: 'Vin Diesel',
      phone: '01256789012',
      order: 'Order 18',
      orderJoinDate: '2024-12-01',
      lock: false, // manually set to false
    },
    {
      id: 19,
      name: 'Dwayne Johnson',
      phone: '01067890123',
      order: 'Order 19',
      orderJoinDate: '2024-12-10',
      lock: true, // manually set to true
    },
    {
      id: 20,
      name: 'Gal Gadot',
      phone: '01178901234',
      order: 'Order 20',
      orderJoinDate: '2024-12-15',
      lock: false, // manually set to false
    },
  ];

  constructor() {}

  getUsers(): Users[] {
    return this.users;
  }
}
