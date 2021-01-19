import 'bootstrap/dist/css/bootstrap.min.css';

import { TaskList } from './App/TaskList';
import { Storage } from './App/Storage';

class App {
  static init() {
    const taskList = new TaskList();
    Storage.loadFromStorage(taskList.allTaskList);
  }
}

App.init();
