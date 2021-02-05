/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL ='/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */

  static setCurrent(user) {
    if (!user.success) {
      alert(user.error);
      return;
    }
    const {name, id} = user.user;
    localStorage.setItem(`user`, JSON.stringify({name, id}));
  }
  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
    App.setState('init');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if(!(localStorage.getItem('user'))){
      return undefined;
    }
      return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static async fetch(data, callback = f => f) {
    return await createRequest({
      data,
      url: User.url + '/current',
      method: 'GET',
      responseType: 'json',
      callback: callback,
    });
  }
  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static  login( data, callback = f => f ) {
    return  createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
       callback:
        (err,responce) => {
               if(responce && response.user){
                this.setCurrent(response.user);
              }
              callback(err,responce);
            }
    })
    
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  // static  register( data, callback = f => f ) {
  //   return createRequest({
  //     data, 
  //     url: this.URL + '/register',
  //     method: 'POST',
  //     responseType: 'json',
  //     callback: (err,responce) =>{
  //       if(responce && response.user){
  //         this.setCurrent(response.user);
  //       }
  //       callback.call(this,err,responce);
  //       }
  //   });
  // }
  static   register(data, callback = f => f ) {
    return   createRequest({
      
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err,responce) => {
       
              if(responce && response.user){
                this.setCurrent(response.user);
              }
              callback.call(err,responce);
              }
    });
    
  }
  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static  logout( data, callback = f => f ) {
    return  createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data,
      // callback: (error,responce) =>{
       
      //         if(responce ){
      //           this.unsetCurrent;
      //         }
      //         callback(error,responce);
      //         }
    });
}
}
