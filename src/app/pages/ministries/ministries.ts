import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Ministry {
  id: number;
  name: string;
  description: string;
  leader: string;
  meetingTime: string;
  image: string;
}

@Component({
  selector: 'app-ministries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ministries.html',
  styleUrl: './ministries.css',
})
export class MinistriesComponent {
  ministries: Ministry[] = [
    {
      id: 1,
      name: 'Kids Ministry',
      description: 'A fun and safe environment for children to learn about God.',
      leader: 'Sarah Johnson',
      meetingTime: 'Sundays 10:00 AM',
      image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Youth Ministry',
      description: 'Empowering the next generation to live for Christ.',
      leader: 'Mike Davis',
      meetingTime: 'Fridays 7:00 PM',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Worship Team',
      description: 'Leading the congregation in praise and worship.',
      leader: 'David Wilson',
      meetingTime: 'Thursdays 6:30 PM',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      name: 'Men\'s Ministry',
      description: 'Building strong men of faith through fellowship and study.',
      leader: 'James Brown',
      meetingTime: 'Saturdays 8:00 AM',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 5,
      name: 'Women\'s Ministry',
      description: 'Encouraging women to grow in their relationship with God.',
      leader: 'Emily White',
      meetingTime: 'Wednesdays 10:00 AM',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 6,
      name: 'Outreach',
      description: 'Serving our local community and spreading the Gospel.',
      leader: 'Tom Harris',
      meetingTime: 'Various Times',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];
}
