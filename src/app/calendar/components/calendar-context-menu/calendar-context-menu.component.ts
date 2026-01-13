import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BookingType } from '../../../shared/types/booking.type';
import { BOOKING_TYPE_CONFIGS } from '../../../shared/mocks/booking-type-config.mock';

export interface ContextMenuPosition {
  x: number;
  y: number;
}

@Component({
  selector: 'app-calendar-context-menu',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './calendar-context-menu.component.html',
  styleUrl: './calendar-context-menu.component.scss'
})
export class CalendarContextMenuComponent {
  @Output() bookingTypeSelected = new EventEmitter<BookingType>();
  @Output() closeMenu = new EventEmitter<void>();
  
  position = input.required<ContextMenuPosition>();
  visible = input.required<boolean>();
  
  readonly bookingTypes = BOOKING_TYPE_CONFIGS;
  
  onBookingTypeClick(type: BookingType, event: Event): void {
    event.stopPropagation();
    this.bookingTypeSelected.emit(type);
  }
  
  onBackdropClick(): void {
    this.closeMenu.emit();
  }
}
