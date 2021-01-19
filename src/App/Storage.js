import { TaskItem } from './TaskItem';

export class Storage {
  static saveInStorage(id, title, description) {
    const task = { title, description };
    localStorage.setItem(id, JSON.stringify(task));
  }

  static loadFromStorage(allTaskList) {
    let keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      let title = JSON.parse(localStorage.getItem(keys[i])).title;
      let description = JSON.parse(localStorage.getItem(keys[i])).description;
      const taskItem = new TaskItem(keys[i], title, description);
      taskItem.element.classList.remove('list-group-item-dark');
      taskItem.element.classList.add('list-group-item-primary');
      document.getElementById('taskContainer').prepend(taskItem.element);
      allTaskList.push(taskItem);
    }
  }

  static removeFromStorage(id) {
    localStorage.removeItem(id);
  }
}
