import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  arrayOfIds: any = []
  products = [
    {
      url: '../../assets/images/trust_speakers.jpg',
      name: 'Trust Speakers'  
    },
    {
      url: '../../assets/images/olympic_bar.jpg',
      name: 'Olympic Bar'  
    },
    {
      url: '../../assets/images/boxing_bag.jpg',
      name: 'Boxing Bag'  
    },
    {
      url: '../../assets/images/squat_rack.jpg',
      name: 'Squat Rack'  
    },
    {
      url: '../../assets/images/digital_clock.jpg',
      name: 'Digital Clock'  
    },
    {
      url: '../../assets/images/treadmilll.jpeg',
      name: 'Treadmill'  
    },
    {
      url: '../../assets/images/nintendo_switch.jpg',
      name: 'Nintendo Switch'  
    },
    {
      url: '../../assets/images/lg_monitor.jpeg',
      name: 'LG Monitor'  
    },
    {
      url: '../../assets/images/smart_tv.jpg',
      name: 'Smart TV'  
    },
    {
      url: '../../assets/images/squat_rack.jpg',
      name: 'Squat Rack'  
    },
    {
      url: '../../assets/images/jump_rope.jpg',
      name: 'Jump Rope'  
    },
    {
      url: '../../assets/images/play_station_4.jpg',
      name: 'Play Station 4'  
    },
    {
      url: '../../assets/images/sofa.jpg',
      name: 'Sofa'  
    },
    {
      url: '../../assets/images/recliner.jpg',
      name: 'Recliner'  
    },
    {
      url: '../../assets/images/gaming_chair.jpg',
      name: 'Gaming Chair'  
    },
    {
      url: '../../assets/images/cabinet.jpg',
      name: 'Cabinet'  
    },
    {
      url: '../../assets/images/kokatsu_table.jpg',
      name: 'Kokatsu Table'  
    },
    {
      url: '../../assets/images/dumbbells.jpg',
      name: 'Dumbbells'  
    },
    {
      url: '../../assets/images/lazy_bag.jpg',
      name: 'Lazy Bag'  
    },
    {
      url: '../../assets/images/air_force_1.jpg',
      name: 'Air Force 1'  
    },
    {
      url: '../../assets/images/air_max.jpg',
      name: 'Air Max'  
    },
    {
      url: '../../assets/images/leather_sandals.jpg',
      name: 'Leather Sandals'  
    },
    {
      url: '../../assets/images/cesare_paciotti.jpg',
      name: 'Cesare Paciotti'  
    },
    {
      url: '../../assets/images/high_heels.jpg',
      name: 'High Heels'  
    },
    {
      url: '../../assets/images/kd_11.jpg',
      name: 'KD 11'  
    },
    {
      url: '../../assets/images/black_bandana.jpg',
      name: 'Black Bandana'  
    },
    {
      url: '../../assets/images/eminem_shirt.jpg',
      name: 'Eminem Shirt'  
    },
    {
      url: '../../assets/images/leather_jacket.jpg',
      name: 'Leather Jacket'  
    },
    {
      url: '../../assets/images/denim_jeans.jpg',
      name: 'Denim Jeans'  
    },
    {
      url: '../../assets/images/nike_hoodie.jpeg',
      name: 'Nike Hoodie'  
    },
    {
      url: '../../assets/images/winter_scarf.jpg',
      name: 'Winter Scarf'  
    },
    {
      url: '../../assets/images/bead_bracelet.jpg',
      name: 'Bead Bracelet'  
    },
    {
      url: '../../assets/images/platinum_rolex.jpeg',
      name: 'Platinum Rolex'  
    },
    {
      url: '../../assets/images/tungsten_ring.jpg',
      name: 'Tungsten Ring'  
    },
    {
      url: '../../assets/images/ray_ban_glasses.jpg',
      name: 'Ray Ban Glasses' 
    },
    {
      url: '../../assets/images/pearl_earrings.jpeg',
      name: 'Pearl Earrings' 
    },
    {
      url: '../../assets/images/dragon_belt.jpg',
      name: 'Dragon Belt'
    },
    {
      url: '../../assets/images/gullivers_travels.jpg',
      name: 'Gullivers Travels'
    },
    {
      url: '../../assets/images/harry_potter.jpg',
      name: 'Harry Potter'
    },
    {
      url: '../../assets/images/little_prince.jpg',
      name: 'The Little Prince'
    },
    {
      url: '../../assets/images/romeo_and_juliet.jpg',
      name: 'Romeo & Juliet'
    },
    {
      url: '../../assets/images/tom_sawyer.jpg',
      name: 'Tom Sawyer'
    },
    {
      url: '../../assets/images/moby_dick.jpg',
      name: 'Moby Dick'
    }
  ]

  constructor() { }

}
