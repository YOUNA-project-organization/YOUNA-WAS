// 여기에다가 서버코드 전반적으로 사용될 타입들을 지정해두도록 할게요

// ENV_TYPE은 현재 코드가 개발모드인지, 배포모드인지를 구분해주기 위한 TYPE입니다. 
export type ENV_TYPE = 'production' | 'development'