/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response.success) {
        const accountsSelect = this.element.querySelector('.accounts-select');
        accountsSelect.innerHTML = '';
        response.data.forEach(elem => {
          const listElement = `<option value="${elem.id}">${elem.name}</option>`;
          accountsSelect.innerHTML += listElement;
        });
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success === true) {
        App.update();
        this.element.reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      }
    })
  }
}