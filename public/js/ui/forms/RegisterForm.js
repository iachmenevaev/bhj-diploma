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
 async onSubmit (options){
   let response =  await User.register();
   console.log(response);
   if (!response.success) {
    return;
      }
    const nearWindow = this.elementForm.closest('.modal');
    const currentForm = App.getForm(nearWindow.dataset.modalId);
    const currentModal = App.getModal(nearWindow.dataset.modalId);
    currentForm.elementForm.reset();
    currentModal.close();
    App.setState( 'user-logged' );

  }
}
