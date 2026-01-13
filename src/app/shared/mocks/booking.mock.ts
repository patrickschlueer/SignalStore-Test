import { Booking } from '../models/entities/booking.interface';

export const MOCK_BOOKINGS: Booking[] = [
  // Patrick - Urlaub
  { id: 'b1', employeeId: '1', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  
  // Devi - Urlaub
  { id: 'b2', employeeId: '2', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b3', employeeId: '2', startDate: new Date(2026, 0, 4), endDate: new Date(2026, 0, 4), type: 'vacation' },
  
  // Martin - Urlaub
  { id: 'b4', employeeId: '3', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  
  // Brigitte - Urlaub Ende Januar
  { id: 'b5', employeeId: '4', startDate: new Date(2026, 0, 26), endDate: new Date(2026, 0, 30), type: 'vacation' },
  
  // Joel - Mix aus Home Office und Urlaub
  { id: 'b6', employeeId: '6', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b7', employeeId: '6', startDate: new Date(2026, 0, 4), endDate: new Date(2026, 0, 4), type: 'vacation' },
  { id: 'b8', employeeId: '6', startDate: new Date(2026, 0, 8), endDate: new Date(2026, 0, 9), type: 'home-office' },
  { id: 'b9', employeeId: '6', startDate: new Date(2026, 0, 12), endDate: new Date(2026, 0, 12), type: 'vacation' },
  { id: 'b10', employeeId: '6', startDate: new Date(2026, 0, 15), endDate: new Date(2026, 0, 15), type: 'sick' },
  { id: 'b11', employeeId: '6', startDate: new Date(2026, 0, 16), endDate: new Date(2026, 0, 16), type: 'vacation' },
  
  // Paul - Home Office
  { id: 'b12', employeeId: '7', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b13', employeeId: '7', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 6), type: 'home-office' },
  { id: 'b14', employeeId: '7', startDate: new Date(2026, 0, 7), endDate: new Date(2026, 0, 7), type: 'sick' },
  { id: 'b15', employeeId: '7', startDate: new Date(2026, 0, 8), endDate: new Date(2026, 0, 9), type: 'home-office' },
  
  // André - Urlaub Ende Januar
  { id: 'b16', employeeId: '8', startDate: new Date(2026, 0, 9), endDate: new Date(2026, 0, 9), type: 'vacation' },
  { id: 'b17', employeeId: '8', startDate: new Date(2026, 0, 28), endDate: new Date(2026, 0, 30), type: 'vacation' },
  
  // Thomas - Viele Home Office Tage
  { id: 'b18', employeeId: '9', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b19', employeeId: '9', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 9), type: 'home-office' },
  { id: 'b20', employeeId: '9', startDate: new Date(2026, 0, 12), endDate: new Date(2026, 0, 16), type: 'home-office' },
  { id: 'b21', employeeId: '9', startDate: new Date(2026, 0, 19), endDate: new Date(2026, 0, 23), type: 'home-office' },
  { id: 'b22', employeeId: '9', startDate: new Date(2026, 0, 26), endDate: new Date(2026, 0, 30), type: 'home-office' },
  
  // Matthias - Event/Schulung
  { id: 'b23', employeeId: '12', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'sick' },
  { id: 'b24', employeeId: '12', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 7), type: 'event' },
  { id: 'b25', employeeId: '12', startDate: new Date(2026, 0, 8), endDate: new Date(2026, 0, 9), type: 'home-office' },
  
  // Sandra - Urlaub
  { id: 'b26', employeeId: '10', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  
  // Tobias - Urlaub Mitte Januar
  { id: 'b27', employeeId: '11', startDate: new Date(2026, 0, 2), endDate: new Date(2026, 0, 2), type: 'vacation' },
  { id: 'b28', employeeId: '11', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 5), type: 'home-office' },
  { id: 'b29', employeeId: '11', startDate: new Date(2026, 0, 12), endDate: new Date(2026, 0, 12), type: 'vacation' },
  { id: 'b30', employeeId: '11', startDate: new Date(2026, 0, 14), endDate: new Date(2026, 0, 16), type: 'sick' },
  { id: 'b31', employeeId: '11', startDate: new Date(2026, 0, 19), endDate: new Date(2026, 0, 19), type: 'vacation' },
  { id: 'b32', employeeId: '11', startDate: new Date(2026, 0, 23), endDate: new Date(2026, 0, 23), type: 'vacation' },
  { id: 'b33', employeeId: '11', startDate: new Date(2026, 0, 28), endDate: new Date(2026, 0, 30), type: 'vacation' },
  
  // Shaghayegh - Verschiedene Buchungen
  { id: 'b34', employeeId: '13', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 5), type: 'home-office' },
  { id: 'b35', employeeId: '13', startDate: new Date(2026, 0, 8), endDate: new Date(2026, 0, 8), type: 'vacation' },
  { id: 'b36', employeeId: '13', startDate: new Date(2026, 0, 12), endDate: new Date(2026, 0, 12), type: 'vacation' },
  { id: 'b37', employeeId: '13', startDate: new Date(2026, 0, 13), endDate: new Date(2026, 0, 14), type: 'vacation' },
  { id: 'b38', employeeId: '13', startDate: new Date(2026, 0, 15), endDate: new Date(2026, 0, 15), type: 'sick' },
  { id: 'b39', employeeId: '13', startDate: new Date(2026, 0, 21), endDate: new Date(2026, 0, 21), type: 'sick' },
  { id: 'b40', employeeId: '13', startDate: new Date(2026, 0, 23), endDate: new Date(2026, 0, 23), type: 'vacation' }
];
