import { Booking } from '../models/entities/booking.interface';

export const MOCK_BOOKINGS: Booking[] = [
  // Patrick - Urlaub
  { id: 'b1', employeeId: 'e9f05aec-18f1-41c1-b3b2-5170d4f3c409', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  
  // Devi - Urlaub
  { id: 'b2', employeeId: '9644c489-8040-4f14-9180-20b478ccab20', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b3', employeeId: '9644c489-8040-4f14-9180-20b478ccab20', startDate: new Date(2026, 0, 4), endDate: new Date(2026, 0, 4), type: 'vacation' },

  // Martin - Urlaub
  { id: 'b4', employeeId: 'cc9ab52b-79dc-401f-888c-78c0540745cb', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  
  // Brigitte - Urlaub Ende Januar
  { id: 'b5', employeeId: 'f2b4513e-da47-48f0-b02b-2c71bff59511', startDate: new Date(2026, 0, 26), endDate: new Date(2026, 0, 30), type: 'vacation' },
  
  // Joel - Mix aus Home Office und Urlaub
  { id: 'b6', employeeId: '7ad48f3c-8f82-4551-996d-74c44f829750', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b7', employeeId: '7ad48f3c-8f82-4551-996d-74c44f829750', startDate: new Date(2026, 0, 4), endDate: new Date(2026, 0, 4), type: 'vacation' },
  { id: 'b8', employeeId: '7ad48f3c-8f82-4551-996d-74c44f829750', startDate: new Date(2026, 0, 8), endDate: new Date(2026, 0, 9), type: 'home-office' },
  { id: 'b9', employeeId: '7ad48f3c-8f82-4551-996d-74c44f829750', startDate: new Date(2026, 0, 12), endDate: new Date(2026, 0, 12), type: 'vacation' },
  { id: 'b10', employeeId: '7ad48f3c-8f82-4551-996d-74c44f829750', startDate: new Date(2026, 0, 15), endDate: new Date(2026, 0, 15), type: 'sick' },
  { id: 'b11', employeeId: '7ad48f3c-8f82-4551-996d-74c44f829750', startDate: new Date(2026, 0, 16), endDate: new Date(2026, 0, 16), type: 'vacation' },
  
  // Paul - Home Office
  { id: 'b12', employeeId: '9455c2b2-8d97-4419-ae9d-01949ae619b7', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b13', employeeId: '9455c2b2-8d97-4419-ae9d-01949ae619b7', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 6), type: 'home-office' },
  { id: 'b14', employeeId: '9455c2b2-8d97-4419-ae9d-01949ae619b7', startDate: new Date(2026, 0, 7), endDate: new Date(2026, 0, 7), type: 'sick' },
  { id: 'b15', employeeId: '9455c2b2-8d97-4419-ae9d-01949ae619b7', startDate: new Date(2026, 0, 8), endDate: new Date(2026, 0, 9), type: 'home-office' },

  // André - Urlaub Ende Januar
  { id: 'b16', employeeId: '3eb9403e-b44a-48c7-8bc7-603a283263db', startDate: new Date(2026, 0, 9), endDate: new Date(2026, 0, 9), type: 'vacation' },
  { id: 'b17', employeeId: '3eb9403e-b44a-48c7-8bc7-603a283263db', startDate: new Date(2026, 0, 28), endDate: new Date(2026, 0, 30), type: 'vacation' },
  
  // Thomas - Viele Home Office Tage
  { id: 'b18', employeeId: '548fc4a4-3bf7-4b37-98d9-79b8ebce839c', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b19', employeeId: '548fc4a4-3bf7-4b37-98d9-79b8ebce839c', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 9), type: 'home-office' },
  { id: 'b20', employeeId: '548fc4a4-3bf7-4b37-98d9-79b8ebce839c', startDate: new Date(2026, 0, 12), endDate: new Date(2026, 0, 16), type: 'home-office' },
  { id: 'b21', employeeId: '548fc4a4-3bf7-4b37-98d9-79b8ebce839c', startDate: new Date(2026, 0, 19), endDate: new Date(2026, 0, 23), type: 'home-office' },
  { id: 'b22', employeeId: '548fc4a4-3bf7-4b37-98d9-79b8ebce839c', startDate: new Date(2026, 0, 26), endDate: new Date(2026, 0, 30), type: 'home-office' },
  
  // Matthias - Event/Schulung
  { id: 'b23', employeeId: 'cccab55e-de67-4052-8867-b036dd2febc5', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'sick' },
  { id: 'b24', employeeId: 'cccab55e-de67-4052-8867-b036dd2febc5', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 7), type: 'event' },
  { id: 'b25', employeeId: 'cccab55e-de67-4052-8867-b036dd2febc5', startDate: new Date(2026, 0, 8), endDate: new Date(2026, 0, 9), type: 'home-office' },
  
  // Sandra - Urlaub
  { id: 'b26', employeeId: '186d47634-be03-4a47-86f5-f351b11680fd', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  
  // Tobias - Urlaub Mitte Januar
  { id: 'b27', employeeId: '0d54c3da-e3bd-4aa4-9d9e-fef81d829859', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b28', employeeId: '0d54c3da-e3bd-4aa4-9d9e-fef81d829859', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 5), type: 'home-office' },
  { id: 'b29', employeeId: '0d54c3da-e3bd-4aa4-9d9e-fef81d829859', startDate: new Date(2026, 0, 12), endDate: new Date(2026, 0, 12), type: 'vacation' },
  { id: 'b30', employeeId: '0d54c3da-e3bd-4aa4-9d9e-fef81d829859', startDate: new Date(2026, 0, 14), endDate: new Date(2026, 0, 16), type: 'sick' },
  { id: 'b31', employeeId: '0d54c3da-e3bd-4aa4-9d9e-fef81d829859', startDate: new Date(2026, 0, 19), endDate: new Date(2026, 0, 19), type: 'vacation' },
  { id: 'b33', employeeId: '0d54c3da-e3bd-4aa4-9d9e-fef81d829859', startDate: new Date(2026, 0, 28), endDate: new Date(2026, 0, 30), type: 'vacation' },
  
  // Shaghayegh - Verschiedene Buchungen
  { id: 'b34', employeeId: 'fd7d6608-2597-474a-9592-7af52a52dceb', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 5), type: 'home-office' },
  { id: 'b35', employeeId: 'fd7d6608-2597-474a-9592-7af52a52dceb', startDate: new Date(2026, 0, 8), endDate: new Date(2026, 0, 8), type: 'vacation' },
  { id: 'b36', employeeId: 'fd7d6608-2597-474a-9592-7af52a52dceb', startDate: new Date(2026, 0, 12), endDate: new Date(2026, 0, 12), type: 'vacation' },
  { id: 'b37', employeeId: 'fd7d6608-2597-474a-9592-7af52a52dceb', startDate: new Date(2026, 0, 13), endDate: new Date(2026, 0, 14), type: 'vacation' },
  { id: 'b38', employeeId: 'fd7d6608-2597-474a-9592-7af52a52dceb', startDate: new Date(2026, 0, 15), endDate: new Date(2026, 0, 15), type: 'sick' },
  { id: 'b40', employeeId: 'fd7d6608-2597-474a-9592-7af52a52dceb', startDate: new Date(2026, 0, 23), endDate: new Date(2026, 0, 23), type: 'vacation' }
];
