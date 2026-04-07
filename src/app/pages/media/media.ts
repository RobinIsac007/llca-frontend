import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.html',
  styleUrl: './media.css',
})
export class MediaComponent {
  activeTab: 'sermons' | 'photos' | 'videos' = 'sermons';

  sermons = [
    { title: 'Walking in Faith', preacher: 'Pastor John', date: '2024-11-24', url: '#' },
    { title: 'The Power of Prayer', preacher: 'Pastor Sarah', date: '2024-11-17', url: '#' },
    { title: 'Grace Abounds', preacher: 'Pastor John', date: '2024-11-10', url: '#' },
  ];

  photos = [
    { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Worship Night' },
    { url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Youth Camp' },
    { url: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', caption: 'Community Service' },
  ];

  videos = [
    { title: 'Christmas Play 2023', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }, // Placeholder
    { title: 'Easter Service Highlights', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  ];

  setActiveTab(tab: 'sermons' | 'photos' | 'videos') {
    this.activeTab = tab;
  }
}
