export interface ITodo {
  _id: string;
  description: string;
  isComplete: boolean;
  deadline?: number;
  expire?: boolean;
  uid: string;
}

export class Todo implements ITodo {

  _id: string;
  description: string;
  isComplete = false;
  deadline?: number;
  expire?: boolean;
  uid: string;

  constructor(parameters) {
    Object.assign(this, parameters);
  }

  toggleState() {
    this.isComplete = !this.isComplete;
  }
}
