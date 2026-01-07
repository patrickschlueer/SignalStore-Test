import { Component, input } from '@angular/core';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-avatar',
  imports: [AvatarModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  name = input<string>('User');
  size = input<number>(40);
}
