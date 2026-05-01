export interface DashboardResponse {
  totalUsers: number;
  totalBooks: number;
  totalEmprunts: number;
  pendingEmprunts: number;
  returnedBooks: number;
  overdueBooks: number;
  totalBibliothecaires: number;
  availableBooks: number;
  lowStockBooks: number;
}