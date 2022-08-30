export interface IndexState {
  type: string,
}

export interface LoginDialogState {
  loginDialogShow: boolean,
  codeLoading: boolean,
  sumbitLoading: boolean,
}

export interface LoginFormState {
  phone: string,
  password: string,
  nickname: string,
  captcha: string,
}
