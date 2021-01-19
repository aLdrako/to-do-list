export class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static addTaskElement(id, title) {
    const el = document.createElement('a');
    el.setAttribute('href', '#');
    el.setAttribute('data-bs-toggle', 'modal');
    el.setAttribute('data-bs-target', '#taskInfoModal');
    el.setAttribute('data-id', id);
    el.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-dark', 'd-flex', 'justify-content-between', 'align-items-center');
    el.innerText = title;
    return el;
  }

  static changeTheme(btnAdd, clearAllBtn, finTaskCounter, taskNameField, themeChangeIcon) {
    if (themeChangeIcon.classList.contains('bi-moon')) {
      themeChangeIcon.classList.replace('bi-moon', 'bi-sun');
      btnAdd.classList.replace('btn-dark', 'btn-light');
      clearAllBtn.classList.replace('btn-outline-dark', 'btn-outline-light');
      finTaskCounter.classList.remove('bg-dark', 'text-light');
      finTaskCounter.classList.add('bg-light', 'text-dark');
      taskNameField.classList.remove('bg-light', 'text-dark');
      taskNameField.classList.add('bg-dark', 'text-light');
      document.body.classList.replace('bg-light', 'bg-dark');
      document.getElementById('headerTitle').classList.replace('text-dark', 'text-light');
      document.getElementById('taskInfoModalLabel').classList.replace('text-dark', 'text-light');
      document.getElementById('descriptionText').classList.replace('text-dark', 'text-light');
      document.querySelector('.modal-content').classList.replace('bg-light', 'bg-dark');
    } else {
      themeChangeIcon.classList.replace('bi-sun', 'bi-moon');
      btnAdd.classList.replace('btn-light', 'btn-dark');
      clearAllBtn.classList.replace('btn-outline-light', 'btn-outline-dark');
      finTaskCounter.classList.remove('bg-light', 'text-dark');
      finTaskCounter.classList.add('bg-dark', 'text-light');
      taskNameField.classList.remove('bg-dark', 'text-light');
      taskNameField.classList.add('bg-light', 'text-dark');
      document.body.classList.replace('bg-dark', 'bg-light');
      document.getElementById('headerTitle').classList.replace('text-light', 'text-dark');
      document.getElementById('taskInfoModalLabel').classList.replace('text-light', 'text-dark');
      document.getElementById('descriptionText').classList.replace('text-light', 'text-dark');
      document.querySelector('.modal-content').classList.replace('bg-dark', 'bg-light');
    }
  }
}
