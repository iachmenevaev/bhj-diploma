/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
      Account.create(options,(err,response) => {
      if (response.success){
  App.update();
  const currentForm = App.getForm('newAccount');
  const currentModal = App.getModal('newAccount');
  currentForm.element.reset();
  currentModal.close();
        }   
    })
  }
}

