export interface ApiResponse<T> {
  status?: number,  
  httpStatusCode?: number;
  httpStatus?: string,
  response?: string,
  message?: string,
  data?: T
  timestamp?: Date;
  reason?: string;
}