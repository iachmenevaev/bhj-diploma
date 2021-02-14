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
  onSubmit(data){
     User.register(data,(err,response) => {
      if(response.success){
      console.log (response.success);
        // this.setCurrent(response.user);
        const nearWindow = this.element.closest('.modal');
        const currentForm = App.getForm(nearWindow.dataset.modalId);
        const currentModal = App.getModal(nearWindow.dataset.modalId);
        currentForm.element.reset();
        App.setState( 'user-logged' );
        currentModal.close();
   
      }
    });
  }
}
