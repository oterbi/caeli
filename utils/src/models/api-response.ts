export interface ApiResponse {
  /* The status code */
  code?: string;

  /* The message in case of success */
  message?: string;

  /* The error in case of failure */
  error?: string;

  /* The related data */
  data?: any;
}
