/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm{
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(options){
 
    User.register(options,(err,response) =>{
       console.log(response);
      // if(responce && response.user){
      //   this.setCurrent(response.user);
      //   const nearWindow = this.elementForm.closest('.modal');
      //   const currentForm = App.getForm(nearWindow.dataset.modalId);
      //   const currentModal = App.getModal(nearWindow.dataset.modalId);
      //   currentForm.elementForm.reset();
      //   currentModal.close();
      //   App.setState( 'user-logged' );
    });
}
}
