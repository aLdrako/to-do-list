import { Modal } from 'bootstrap';
import { TaskItem } from './TaskItem';
import { DOMHelper } from './DOMHelper';
import { Storage } from './Storage';

export class TaskList {
  constructor() {
    this.btnAdd = document.getElementById('addTaskBtn');
    this.taskNameField = document.getElementById('taskFieldInput');
    this.clearAllBtn = document.getElementById('clearAllFinishedBtn');
    this.finTaskCounter = document.getElementById('finishedTaskCounter');
    this.themeChangeIcon = document.getElementById('themeChangeIcon');
    this.allTaskList = [];
    this.finishedTaskList = [];
    this.addTask;
    this.attachTaskEvents();
    this.selectTask();
  }

  addTask() {
    if (this.taskNameField.value.length) {
      const taskItem = new TaskItem(Math.random().toString(36).substr(2, 7), this.taskNameField.value);
      document.getElementById('taskContainer').prepend(taskItem.element);
      this.taskNameField.value = '';
      this.allTaskList.push(taskItem);
    } else {
      this.taskNameField.focus();
    }
  }

  attachTaskEvents() {
    this.btnAdd.addEventListener('click', this.addTask.bind(this));
    this.taskNameField.addEventListener('keydown', (e) => (e.code === 'Enter' ? this.addTask() : null));
    this.clearAllBtn.addEventListener('click', () => {
      document.querySelector('#taskDoneContainer ul').textContent = '';
      this.finTaskCounter.textContent = 0;
      this.finishedTaskList.length = 0;
      document.getElementById('clearBlock').classList.add('invisible');
    });
    this.themeChangeIcon.addEventListener(
      'click',
      DOMHelper.changeTheme.bind(this, this.btnAdd, this.clearAllBtn, this.finTaskCounter, this.taskNameField, this.themeChangeIcon)
    );
  }

  closeBtnHandler(descriptionTextArea, descriptionText, btnSaveDesc) {
    descriptionText.classList.remove('d-none');
    descriptionTextArea.classList.add('d-none');
    btnSaveDesc.classList.add('d-none');
  }

  deleteBtnHandler(event, btnSaveDesc) {
    if (btnSaveDesc.classList.contains('d-none')) {
      this.allTaskList.splice(
        this.allTaskList.findIndex((item) => item.id === event.target.dataset.id),
        1
      );
      Storage.removeFromStorage(event.target.dataset.id);
      event.target.remove();
      Modal.getInstance(document.getElementById('taskInfoModal')).hide();
    } else {
      btnSaveDesc.focus();
    }
  }

  saveBtnHandler(event, descriptionTextArea, descriptionText, btnSaveDesc, selectedItem) {
    if (descriptionTextArea.value.length) {
      descriptionText.classList.remove('d-none');
      descriptionTextArea.classList.add('d-none');
      btnSaveDesc.classList.add('d-none');
      descriptionText.textContent = descriptionTextArea.value;
      selectedItem.taskDescription = descriptionText.textContent;
      event.target.classList.remove('list-group-item-dark');
      event.target.classList.add('list-group-item-primary');
      Storage.saveInStorage(selectedItem.id, selectedItem.title, selectedItem.taskDescription);
    } else {
      descriptionTextArea.focus();
    }
  }

  descriptionUpdHandler(descriptionTextArea, descriptionText, btnSaveDesc, selectedItem) {
    descriptionTextArea.classList.remove('d-none');
    descriptionText.classList.add('d-none');
    btnSaveDesc.classList.remove('d-none');
    if (selectedItem.taskDescription !== 'Write your task description here.') {
      descriptionTextArea.value = descriptionText.innerText;
    } else {
      descriptionTextArea.value = '';
    }
  }

  finishedTaskHandler(event, btnSaveDesc) {
    if (btnSaveDesc.classList.contains('d-none')) {
      const finishedElement = document.createElement('li');
      const finishedContainer = document.querySelector('#taskDoneContainer ul');
      const time = new Date();
      finishedElement.textContent = event.target.textContent;
      finishedElement.classList.add('list-group-item', 'list-group-item-success', 'd-flex', 'justify-content-between', 'align-items-center');
      finishedElement.insertAdjacentHTML(
        'beforeend',
        `<span class="badge rounded-pill bg-success">${time.getDate()}/${time.getMonth() + 1}, ${time.toLocaleTimeString()}</span>`
      );
      finishedContainer.prepend(finishedElement);
      document.getElementById('clearBlock').classList.remove('invisible');
      Storage.removeFromStorage(event.target.dataset.id);
      event.target.remove();
      Modal.getInstance(document.getElementById('taskInfoModal')).hide();
      this.finishedTaskList.unshift(finishedElement);

      if (this.finishedTaskList.length > 7) {
        this.finishedTaskList.pop();
        finishedContainer.removeChild(finishedContainer.lastElementChild);
      }

      this.finTaskCounter.textContent = this.finishedTaskList.length;
    } else {
      btnSaveDesc.focus();
    }
  }

  selectTask() {
    const taskContainer = document.getElementById('taskContainer');

    taskContainer.addEventListener('click', (event) => {
      let btnSaveDesc = document.getElementById('btnSaveDesc');
      let btnDelTask = document.getElementById('btnDelTask');
      let btnFinishedTask = document.getElementById('btnFinishedTask');
      let btnClose = document.getElementById('btnClose');
      let descriptionText = document.getElementById('descriptionText');
      const descriptionTextArea = document.getElementById('descriptionTextArea');
      const selectedItem = this.allTaskList.find((item) => item.id === event.target.dataset.id);

      descriptionText.textContent = selectedItem.taskDescription;

      btnSaveDesc = DOMHelper.clearEventListeners(btnSaveDesc);
      btnDelTask = DOMHelper.clearEventListeners(btnDelTask);
      btnFinishedTask = DOMHelper.clearEventListeners(btnFinishedTask);
      btnClose = DOMHelper.clearEventListeners(btnClose);
      descriptionText = DOMHelper.clearEventListeners(descriptionText);

      btnClose.addEventListener('click', this.closeBtnHandler.bind(this, descriptionTextArea, descriptionText, btnSaveDesc));
      btnDelTask.addEventListener('click', this.deleteBtnHandler.bind(this, event, btnSaveDesc));
      btnSaveDesc.addEventListener('click', this.saveBtnHandler.bind(this, event, descriptionTextArea, descriptionText, btnSaveDesc, selectedItem));
      descriptionText.addEventListener('click', this.descriptionUpdHandler.bind(this, descriptionTextArea, descriptionText, btnSaveDesc, selectedItem));
      btnFinishedTask.addEventListener('click', this.finishedTaskHandler.bind(this, event, btnSaveDesc));
    });
  }
}
