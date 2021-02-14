// /**
//  * Класс LoginForm управляет формой
//  * входа в портал
//  * Наследуется от AsyncForm
//  * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
   onSubmit(data) {
    User.login(data,(err,response) => {
    if(response.success){
     User.setCurrent(response);
    const nearWindow = this.element.closest('.modal');
    const currentForm = App.getForm(nearWindow.dataset.modalId);
    const currentModal = App.getModal(nearWindow.dataset.modalId);
    currentForm.element.reset();
    App.setState('user-logged');
    currentModal.close();
    }   
   })
 }
}