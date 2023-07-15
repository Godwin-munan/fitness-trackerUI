export enum AppRoles {
  SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
}

export enum HttpStatus{
  HTTP_200_OK=200,
  HTTP_201_CREATED = 201,
  NOT_FOUND=400,
  UNAUTHORIZE=401,
  BAD_CREDENTIAL=404
}

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export enum AuthEndPoints{
  
  LOGIN = "/api/user/login",
  SIGNUP = "/api/user/register"
}

export enum ExerciseEndPoints {

  ADD_EXERCISE = "/api/exercise",
  GET_EXERCISE = "/api/exercise",
  GET_EXERCISE_ID = "/api/exercise/",
  PUT_EXERCISE = "/api/exercise",
  DELETE_EXERCISE = "/api/exercise"

}

export enum ExecutedExerciseEndPoints {

  ADD_EX_EXERCISE = "/api/activated",
  ADD_EX_EXERCISE_USERID = "/api/activated/",
  GET_EX_EXERCISE = "/api/activated",
  GET_EX_EXERCISE_USERID = "/api/activated/",
  PUT_EX_EXERCISE = "/api/activated",
  DELETE_EX_EXERCISE = "/api/activated"

}

export enum ExerciseState {
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum AccessToken {
  ACCESS_TOKEN = "access_token",
}

export enum Constants {
  PRINCIPAL = "principal",
  ERROR = "error",
  SUCCESS = "success",
  ERROR_SNACKBAR = "red-snackbar",
  SUCCESS_SNACKBAR = "green-snackbar"
}