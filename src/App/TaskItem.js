import { DOMHelper } from './DOMHelper';

export class TaskItem {
  constructor(id, title, description = 'Write your task description here.') {
    this.id = id;
    this.title = title;
    this.taskDescription = description;
    this.element;
    this.createTask();
    this.openTaskInfo();
  }

  createTask() {
    this.element = DOMHelper.addTaskElement(this.id, this.title);
  }

  openTaskInfo() {
    const modalTitle = document.getElementById('taskInfoModalLabel');
    this.element.addEventListener('click', () => {
      modalTitle.textContent = this.element.innerText;
    });
  }
}
