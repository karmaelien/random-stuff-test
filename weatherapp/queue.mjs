export class Queue {
    constructor() {
       this.elements = [];
    }
    
    get length(){
        return this.elements.length
    }

    enqueue(node) {
       this.elements.push(node);
    }
  
    dequeue() {
       if(this.elements.length > 0) { 
           return this.elements.shift();
       } else {
           return 'Underflow situation';
       }
    }
    isEmpty() {
       return this.elements.length == 0;
    }
    
    front() {
       if(this.elements.length > 0) {
           return this.elements[0];
       } else {
           return "The Queue is empty!";
       }
    }
    print() {
       return this.elements;
    }
 }

