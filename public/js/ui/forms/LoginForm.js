/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
   onSubmit(data) {
     console.log(data);
    User.login(data,(err,response) => {
      console.log (response) });
    const nearWindow = this.elementForm.closest('.modal');
    const currentForm = App.getForm(nearWindow.dataset.modalId);
    const currentModal = App.getModal(nearWindow.dataset.modalId);
    currentForm.elementForm.reset();
    currentModal.close();
    App.setState('user-logged');
   
   }
}
